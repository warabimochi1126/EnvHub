import { array, z } from "zod";

// ファイルサイズの上限を100KBとする
const maxFileSize = 1 * 1024 * 100;

// ファイルの名前が.envで始まっていること
// 1ファイルあたり100KB以下のファイルであること がバリデーション条件
const envFileSchema = z.object({
    name: z.string().startsWith(".env", { message: "envファイル以外が含まれています。" }),
    size: z.number().lte(maxFileSize, { message: "適切なファイルサイズのファイルをアップロードしてください。" })
});

const envFilesSchema = z.array(envFileSchema);


// ファイルアップロードの実装
// アップロードされたファイルが.envで始まってるか確認する
// .envで始まってなかったらエラー投げる？ エラーの表示はreact-toastifyで表記する
// envで始まっててそのまま投稿できたら成功メッセージを表記する.これもreact-toastifyで表記する
  
export const isEnvFiles = (files: File[]): { isError: boolean, messages: string[] } => {
    const parsedObj = envFilesSchema.safeParse(files);
    let messages: string[] = [];

    if(!parsedObj.success) {
        const fieldErrors = parsedObj.error.flatten()?.fieldErrors;
        // エラーメッセージを抜き出して配列の要素として使う
        const errorsArray = Object.values(fieldErrors).flat() as string[];
        
        // 重複するエラーメッセージを弾いて１つのエラーメッセージにする
        messages = errorsArray.filter((item, index) => errorsArray.indexOf(item) === index);

        return {
            isError: true,
            messages
        };
    }

    messages = ["アップロード処理を実行中です。"];

    return {
        isError: false,
        messages
    };
}
