import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { isValidCommitFileDownloadRequestObject } from "@/validation/backend/commit-file-download.validation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { repository_id: string; commit_uuid: string; filename: string } }
) {
  try {
    const supabase = createClient();
    const { repository_id: repositoryId, commit_uuid: commitUuid, filename: fileName } = params;

    // prettier-ignore
    if (!isValidCommitFileDownloadRequestObject({ repositoryId, commitUuid: commitUuid.toLowerCase(), fileName })) {
      throw new Error("バリデーションでエラーが発生しました。");
    }

    const isAuthorizedRepository = await isAuthUserRepository(Number(repositoryId));
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザのが保持していないリポジトリを対象にファイルアップロードは行えません。" },
        { status: 403 }
      );
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("envHub_storage")
      .createSignedUrl(`${repositoryId}/${commitUuid}/${fileName}`, 30);

    if (!signedUrlData || signedUrlError) {
      throw new Error("署名付きURLの生成に失敗しました。");
    }

    return Response.json(signedUrlData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
    return Response.json({ message: "想定外のエラーによりアップロードが失敗しました。" }, { status: 500 });
  }
}
