import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { isValidEnvFileList, isValidMetaData } from "@/validation/backend/file-upload.validation";
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

interface MetaData {
  repo_name: string;
  repo_id: number;
  commit_message: string;
}

// TODO: 処理毎に分離したい
export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const receivedFormData = await request.formData();
    const metaDataInFormData = receivedFormData.get("meta_data");
    const metaData = JSON.parse(metaDataInFormData as string) as MetaData;
    const uploadTargetFiles = receivedFormData.getAll("upload_target_files") as File[];

    if (!isValidMetaData(metaData) || !isValidEnvFileList(uploadTargetFiles)) {
      throw new Error("バリデーションでエラーが発生しました。");
    }

    // 紐づけリポジトリを本人が保持しているかの確認
    const isAuthorizedRepository = await isAuthUserRepository(metaData.repo_id);
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザのが保持していないリポジトリを対象にファイルアップロードは行えません。" },
        { status: 403 }
      );
    }

    // TODO: アップロードロジックの実装
    // 1.DBのリポジトリテーブルにリポジトリ名・リポジトリID・コミットのIDをアップサートする
    // リポジトリ名・リポジトリIDは一意である必要があるので、存在確認 -> あれば何もしない なければ -> インサート
    // コミットのIDについては必ず作成 + アップサート
    // 2.コミットハッシュテーブルにコミットハッシュID(1番で作られた物)・そのタイミングでアップロードされたファイルの名前全て + 親リポジトリの名前をインサートする
    // 1番の存在確認の時点で存在が確認出来る -> 一つ前のコミットハッシュIDが存在することになるので、そのコミットハッシュIDを一つ前のIDという形でカラムに入れる
    // 1番の存在確認の時点で存在が確認出来ない -> 一つ前のコミットハッシュIDは存在しないことになるので、一つ前のIDを入れているカラムにはnullを代入する
    // コミットに個数制限を掛けたい場合は、コミットハッシュを辿って一つ前のIDを入れているカラムにはnullを代入している部分がその個数になっていたら削除する
    // オブジェクトストレージにはコミットハッシュID/ファイル名の形で保存する

    let previousCommitUuid: string = "";
    // リポジトリの存在確認を行う
    const { data } = await supabase
      .from("repository_latest_commits")
      .select()
      .eq("repository_id", metaData.repo_id);
    if (data === null) {
      throw new Error("repositoryIdに紐づく最新コミットが取得出来ませんでした。");
    }
    if (data.length !== 0) {
      previousCommitUuid = data[0].latest_commit_uuid;
    }

    const now = new Date().toISOString();
    const currentCommitUuid = randomUUID();
    const { error: upsertError } = await supabase.from("repository_latest_commits").upsert({
      repository_id: metaData.repo_id,
      repository_name: metaData.repo_name,
      latest_commit_uuid: currentCommitUuid,
      updated_at: now,
    });
    if (upsertError) {
      throw new Error("repository_latest_commitsテーブルに保存出来ませんでした。");
    }

    // 一つ前のUUIDが存在すれば -> それを指定, しなければ null
    // 一つ前のIDが存在しない状況 -> 始めてのインサートのタイミング、よってrepository_latest_commitsテーブルの中にrepoIdでリードしても何もない状態の時 -> null
    // 一つ前のIDが存在する状況 -> ２回目以降のインサートのタイミング、よってrepository_latest_commitsテーブルの中にrepoIdでリードすると何かしら存在する状態の時 -> そのIDをprevious_coomit_uuidにする

    const userData = await supabase.auth.getUser();
    const commiterName = userData.data.user?.user_metadata.user_name;

    const uploadTargetFileNames = uploadTargetFiles.map((uploadTargetFiles) => uploadTargetFiles.name);
    const { error: insertError } = await supabase.from("commit_files_history").insert({
      commit_uuid: currentCommitUuid,
      file_names: uploadTargetFileNames,
      commit_message: metaData.commit_message,
      parent_repository_id: metaData.repo_id,
      previous_commit_uuid: previousCommitUuid ? previousCommitUuid : null,
      commiter_name: commiterName ? commiterName : null,
    });
    if (insertError) {
      throw new Error("commit_files_historyテーブルに保存出来ませんでした。");
    }

    // オブジェクトストレージへの保存は、UUID/ファイル名で保存する
    const storageUploadResults = await Promise.all(
      uploadTargetFiles.map((uploadTargetFile) =>
        supabase.storage
          .from("envHub_storage")
          .upload(`${metaData.repo_id}/${currentCommitUuid}/${uploadTargetFile.name}`, uploadTargetFile)
      )
    );
    const hasUploadError = storageUploadResults.some(
      (storageUploadResult) => storageUploadResult.error !== null
    );
    if (hasUploadError) {
      throw new Error("オブジェクトストレージに保存出来ませんでした。");
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
    return Response.json({ message: "想定外のエラーによりアップロードが失敗しました。" }, { status: 500 });
  }

  return Response.json({ message: "ファイルアップロードに成功しました！" }, { status: 200 });
}
