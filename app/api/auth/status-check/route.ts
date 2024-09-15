import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// TODO:try-catchでエラーハンドリングしたら見通しが悪くなったのでリファクタリングする
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const isLoggedIn = !!(await supabase.auth.getUser()).data.user;
  // TODO:場当たり的な解決策
  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;

  const accessOrigin = request.nextUrl.origin;
  if (isLoggedIn && providerToken) {
    let redirectPath;
    try {
      redirectPath = await request.json();
    } catch (e: any) {
      return NextResponse.json(
        {
          message:
            "bodyが存在しないか、正しいリダイレクト先ではありませんでした。",
        },
        { status: 400 }
      );
    }

    if (redirectPath) {
      try {
        return NextResponse.json(
          {
            redirectUrl: new URL(redirectPath, accessOrigin),
          },
          { status: 200 }
        );
      } catch (e: any) {
        return NextResponse.json(
          {
            message: "正しいリダイレクト先を指定してください。",
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "リダイレクト先を送信してください。",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "ログイン状態を取得出来ませんでした。",
      },
      { status: 401 }
    );
  }
}
