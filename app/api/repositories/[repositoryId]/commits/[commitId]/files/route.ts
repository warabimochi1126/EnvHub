import { NextRequest } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { repositoryId: string; commitId: string } }
) {
  const { repositoryId, commitId } = params;
  console.log(params);

  // TODO:認証ユーザのリポジトリ一覧にrepoIdが存在するか確認する

  // TODO:repoIdを使って、最新コミットを取得 -> 最新コミットを使ってファイル名を全て取得 -> コミットID +ファイル名でオブジェクトストレージから必要な情報を取得する
  // commitIdがlatestなら最新コミットを引っ張ってくる、そうでなければそれでreadする

  return Response.json({ message: true });
}
