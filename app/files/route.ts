import { z } from "zod";
import { NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isEnvFiles } from "../functions/isEnvFile";
import { redirect } from "next/navigation";

const fileSchema = z.object({
    repositoryId: z.string().min(1, { message: "repository_idは必須です。" }),
    fileName: z.string().startsWith(".env", { message: "ファイル名は.envで始まっている必要があります。"})
});

// ダウンロード側   
export async function GET(request: NextRequest) {
    const supabase = createClient();

    console.log("エンドポイント発火確認");

    const searchParams = request.nextUrl.searchParams;
    const repositoryId = searchParams.get("repository_id") ?? "";
    const fileName = searchParams.get("file_name") ?? "";

    console.log("repositoryId:", repositoryId);
    console.log("fileName:", fileName);
    
    const parsedObj = fileSchema.safeParse({
        repositoryId,
        fileName
    });

    if(!parsedObj.success) {
        const fieldErrors = parsedObj.error.flatten().fieldErrors;
        const errorsArray = Object.values(fieldErrors).flat() as string[];

        return Response.json({
            isError: true,
            messages: errorsArray
        });
    }

    const { data, error } = await supabase.storage.from("env_bucket").createSignedUrl(`${repositoryId}/${fileName}`, 10);

    if (error) {
        return Response.json({
            isError: true,
            messages: ["ファイルダウンロード時に何らかのエラーが発生しました。"]
        })
    }

    if (data) {
        redirect(data.signedUrl);
    }

    return Response.json({
        isError: true,
        messages: ["何らかの理由でファイルダウンロードに失敗しました。"]
    })
}


// アップロード側
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

// 削除側
export async function DELETE(request: NextRequest) {
    const supabase = createClient();

    const searchParams = request.nextUrl.searchParams;
    const repositoryId = searchParams.get("repository_id") ?? "";
    const fileName = searchParams.get("file_name") ?? "";

    const parsedObj = fileSchema.safeParse({
        repositoryId,
        fileName
    });

    if(!parsedObj.success) {
        const fieldErrors = parsedObj.error.flatten().fieldErrors;
        const errorsArray = Object.values(fieldErrors).flat() as string[];

        return Response.json({
            isError: true,
            messages: errorsArray
        });
    }
    
    const { data, error } = await supabase.storage.from("env_bucket").remove([`${repositoryId}/${fileName}`]);

    if (error) {
        return Response.json({
            isError: true,
            message: ["ファイルダウンロード時に何らかのエラーが発生しました。"]
        })
    }

    return Response.json({
        data: data
    });
}