//

import { NextRequest } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { repositoryId: string } }
) {
  const repositoryId = params.repositoryId;

  // TODO:repoIDからコミットの一覧を取得する -> コミットのテーブルから情報を返す

  return Response.json({ message: true });
}
