import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

interface MetaData {
  repo_name: string;
  repo_id: number;
}

export async function POST(request: NextRequest) {
  // const supabase = createClient();

  try {
    const receivedFormData = await request.formData();
    const metaDataInFormData = receivedFormData.get("meta_data");
    const metaData = JSON.parse(metaDataInFormData as string);
    // prettier-ignore
    const uploadTargetFiles = receivedFormData.getAll("upload_target_files") as File[];

    // TODO: バリデーションの実装

    console.log(metaData);
    console.log(metaData.repo_id);
    console.log(metaData.repo_name);

    console.log(uploadTargetFiles[0]);

    // TODO: 紐づけリポジトリを本人が保持しているかの確認

    // TODO: アップロードロジックの実装
    // 1.DBのリポジトリテーブルにリポジトリ名・リポジトリID・コミットハッシュみたいな物のIDをアップサートする
    // 2.コミットハッシュテーブルにコミットハッシュID・そのタイミングでアップロードされたファイル全てのIDをインサートする
  } catch (e) {
    return Response.json(
      { message: "何らかの理由でファイルアップロードが成功しませんでした。" },
      { status: 500 }
    );
  }

  return Response.json(
    { message: "ファイルアップロードに成功しました！" },
    { status: 200 }
  );
}
