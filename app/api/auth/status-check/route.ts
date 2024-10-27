import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// TODO:try-catchでエラーハンドリングしたら見通しが悪くなったのでリファクタリングする
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const isLoggedIn = !!(await supabase.auth.getUser()).data.user;
  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;

  const accessOrigin = request.nextUrl.origin;
  if (isLoggedIn && providerToken) {
    let redirectPath;
    try {
      redirectPath = await request.json();
    } catch (e) {
      return createErrorResponse("bodyが存在しないか、正しいリダイレクト先ではありませんでした。", 400);
    }

    if (redirectPath) {
      try {
        return NextResponse.json(
          {
            redirectUrl: new URL(redirectPath, accessOrigin),
          },
          { status: 200 }
        );
      } catch (e) {
        return createErrorResponse("正しいリダイレクト先を指定してください。", 400);
      }
    } else {
      return createErrorResponse("リダイレクト先を送信してください。", 400);
    }
  } else {
    return createErrorResponse("ログイン状態を取得出来ませんでした。", 401);
  }
}

// エラーレスポンス作成用
function createErrorResponse(message: string, statusCode: number) {
  return NextResponse.json({ message }, { status: statusCode });
}
