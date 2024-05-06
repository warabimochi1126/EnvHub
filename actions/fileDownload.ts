"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const fileDownloadSchema = z.object({
    repositoryId: z.string().min(1, { message: "リポジトリIDは必須です。" }),
    fileName: z.string().startsWith(".env", { message: "ファイル名は.envで始まっている必要があります。"})
});

export const fileDownload = async (repositoryId: string, fileName: string) => {
    const supabase = createClient();

    // TODO: セキュアにするなら入力値のバリデーション・ログインしてるアカウントのリポジトリ一覧との照合が必須？
    // リポジトリIDと渡された値を照合したらダウンロード時が遅くなる

    const parsedObj = fileDownloadSchema.safeParse({
        repositoryId,
        fileName
    });

    if(!parsedObj.success) {
        console.log("オブジェクトparse時にエラー発生した。");
        return;
    }

    const { data, error } = await supabase.storage.from("env_bucket").createSignedUrl(`${repositoryId}/${fileName}`, 10);

    if (error) {
        throw new Error("DLリンク取得する時にエラー発生した。");
    }
    
    if (data) {
        redirect(data.signedUrl);
    }
}