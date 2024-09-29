import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { isValidCommitFilesDownloadRequestObject } from "@/validation/backend/commit-files-download.validation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { repository_id: string; commit_uuid: string } }
) {
  try {
    const supabase = createClient();

    const { repository_id: repositoryId, commit_uuid: commitUuid } = params;
    if (!isValidCommitFilesDownloadRequestObject({ repositoryId, commitUuid: commitUuid.toLowerCase() })) {
      throw new Error("バリデーションでエラーが発生しました。");
    }
    const isAuthorizedRepository = await isAuthUserRepository(Number(repositoryId));
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザのが保持していないリポジトリを対象にファイルアップロードは行えません。" },
        { status: 403 }
      );
    }

    const { data: commitFileHistory, error: commitFileHistoryError } = await supabase
      .from("commit_files_history")
      .select("file_names")
      .eq("commit_uuid", commitUuid);

    if (!commitFileHistory || commitFileHistoryError) {
      throw new Error("コミットに紐づくファイル群を取得出来ませんでした。");
    }

    const formattedFilePaths = commitFileHistory[0].file_names.map(
      (fileName) => `${repositoryId}/${commitUuid}/${fileName}`
    );

    const { data: signedUrlsData, error: signedUrlsError } = await supabase.storage
      .from("envHub_storage")
      .createSignedUrls(formattedFilePaths, 30);
    if (!signedUrlsData || signedUrlsError) {
      throw new Error("署名付きURLの生成に失敗しました。");
    }

    // TODO:返すデータ絞るべき
    return Response.json(signedUrlsData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      { message: "何らかの理由でファイルダウンロードが成功しませんでした。" },
      { status: 500 }
    );
  }
}
