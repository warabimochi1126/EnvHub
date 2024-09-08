import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// TODO:try-catchでエラーハンドリングしたら見通しが悪くなったのでリファクタリングする
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const isLoggedIn = !!(await supabase.auth.getUser()).data.user;

  if (isLoggedIn) {
    let redirectUrl;
    try {
      redirectUrl = await request.json();
    } catch {
      return NextResponse.json(
        {
          message:
            "bodyが存在しないか、正しいリダイレクト先ではありませんでした。",
        },
        { status: 400 }
      );
    }

    if (redirectUrl) {
      try {
        return NextResponse.redirect(redirectUrl);
      } catch {
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
