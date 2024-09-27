"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// TODO:RouteHandler側に移動させる
export const githubSignIn = async (redirectPath: string) => {
  const supabase = createClient();

  // TODO:redirectToのオリジン部分まではsupabaseに登録したドメインに上書きされてるっぽい、また検証する
  // 恐らく登録してたら上書き、してなかったらenvから引っ張ってくるという挙動を取っていそう
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo read:org",
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/auth/callback?next=${redirectPath}`,
    },
  });

  if (!data.url) {
    throw new Error("No url returned");
  }

  redirect(data.url);
};
