import { createClient } from "@/lib/supabase/server";
import { isEnvFiles } from "../functions/isEnvFile";

export async function POST(request: Request) {
    const supabase = createClient();

    const formData = await request.formData();
    const files = formData.getAll("file") as unknown as File[];
    const repoId = formData.get("repoId");

    const { isError } = isEnvFiles(files);
    if (isError) {
        return Response.json({
            isError: true,
            message: "バリデーションエラーが発生しました。" 
        });
    }


    for (const file of files) {
        const { error } = await supabase.storage.from("env_bucket").upload(`${repoId}/${file.name}`, file, {
            upsert: true
        });

        console.log("error:");
        console.log(error);

        if (error) {
            return Response.json({
                isError: true, 
                message: "アップロード中に何らかの問題が発生しました。" 
            });
        }
    }

    return Response.json({
        isError: false,
        message: "アップロードが成功しました！" 
    });
}