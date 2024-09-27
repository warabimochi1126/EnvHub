//

import { isAuthUserRepository } from "@/datas/fetchAuthUserRespositories";
import { createClient } from "@/lib/supabase/server";
import { isValidRepositoryId } from "@/validation/backend/get-commit-list.validation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { repository_id: string } }) {
  try {
    const supabase = createClient();
    const repositoryId = params.repository_id;

    if (!isValidRepositoryId(repositoryId)) {
      throw new Error();
    }

    // 紐づけリポジトリを本人が保持しているかの確認
    const isAuthorizedRepository = await isAuthUserRepository(Number(repositoryId));
    if (!isAuthorizedRepository) {
      return Response.json(
        { message: "認証ユーザが保持していないリポジトリを対象にコミット一覧は取得出来ません。" },
        { status: 403 }
      );
    }

    // repositoryIdに紐づいたcommitの情報を返す
    const { data: commitList, error } = await supabase
      .from("commit_files_history")
      .select("commit_message, commiter_name, created_at")
      .eq("parent_repository_id", repositoryId);

    if (commitList === null || error) {
      throw new Error();
    }

    return Response.json({ commit_list: commitList }, { status: 200 });
  } catch {
    return Response.json({ message: "コミット一覧が取得出来ませんでした。" }, { status: 500 });
  }
}
