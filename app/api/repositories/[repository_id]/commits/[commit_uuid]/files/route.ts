import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

// TODO:後にservice,repositoryで分離する
export async function GET(
  request: NextRequest,
  { params }: { params: { repository_id: string; commit_uuid: string } }
) {
  try {
    const supabase = createClient();
    const { repository_id: repositoryId, commit_uuid: commitUuid } = params;

    // TODO:repoId: string,  commitId: stringでバリデーションする

    // 紐づけリポジトリを本人が保持しているかの確認
    const isAuthorizedRepository = isAuthUserRepository(Number(repositoryId));
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザのが保持していないリポジトリを対象にファイルアップロードは行えません。" },
        { status: 403 }
      );
    }

    // TODO:repoIdを使って、最新コミットを取得 -> 最新コミットを使ってファイル名を全て取得 -> コミットID +ファイル名でオブジェクトストレージから必要な情報を取得する
    // commitIdがlatestなら最新コミットを引っ張ってくる、そうでなければそれでreadする
    let targetCommitUuid: string = "";
    if (commitUuid === "latest") {
      const { data: latestCommitData, error: latestCommitError } = await supabase
        .from("repository_latest_commits")
        .select("latest_commit_uuid")
        .eq("repository_id", repositoryId)
        .single();

      if (latestCommitData === null || latestCommitError) {
        throw new Error();
      }

      targetCommitUuid = latestCommitData.latest_commit_uuid;
    }

    targetCommitUuid = targetCommitUuid ? targetCommitUuid : commitUuid;
    // TODO:取得処理は正しいが、保存上手くいってなさそうなので、保存側を修正する
    // UUID + ファイル名でファイルのオブジェクト情報が取得出来る
    // TODO:repoIdとcommitIdを使ってファイル名取得
    const { data: fileNames, error: commitFilesHistoryError } = await supabase
      .from("commit_files_history")
      .select("file_names")
      .eq("commit_uuid", targetCommitUuid)
      .single();

    if (fileNames === null || commitFilesHistoryError) {
      throw new Error();
    }

    const { data: storageData, error: storageError } = await supabase.storage
      .from("envHub_storage")
      .list(`${repositoryId}/${targetCommitUuid}`);

    if (storageError) {
      throw new Error();
    }

    return Response.json(storageData, { status: 200 });
  } catch {
    return Response.json({ message: "何らかの理由でファイル取得が成功しませんでした。" }, { status: 500 });
  }
}
