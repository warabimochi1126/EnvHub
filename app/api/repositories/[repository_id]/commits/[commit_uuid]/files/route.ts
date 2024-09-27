import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { isValidStorageDataRequestObject } from "@/validation/backend/get-storage-data.validation";
import { NextRequest } from "next/server";

// TODO:後にservice,repositoryで分離する
export async function GET(
  request: NextRequest,
  { params }: { params: { repository_id: string; commit_uuid: string } }
) {
  // console.log("requestAllCookies");
  // console.log(request.cookies.getAll());
  // const headers = Object.fromEntries(request.headers);
  // console.log("AllHeaders");
  // console.log(headers);
  try {
    const supabase = createClient();
    const { repository_id: repositoryId, commit_uuid: commitUuid } = params;
    if (!isValidStorageDataRequestObject({ repositoryId, commitUuid: commitUuid.toLowerCase() })) {
      throw new Error();
    }

    // 紐づけリポジトリを本人が保持しているかの確認
    const isAuthorizedRepository = await isAuthUserRepository(Number(repositoryId));
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザのが保持していないリポジトリを対象にファイルアップロードは行えません。" },
        { status: 403 }
      );
    }

    console.log(isAuthorizedRepository);

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

    // TODO:返すデータを精査する
    return Response.json(storageData, { status: 200 });
  } catch {
    return Response.json({ message: "何らかの理由でファイル取得が成功しませんでした。" }, { status: 500 });
  }
}
