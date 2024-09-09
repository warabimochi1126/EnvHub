"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const githubSignIn = async (redirectUrl: string) => {
  const supabase = createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo",
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/auth/callback?next=${redirectUrl}`,
    },
  });

  if (!data.url) {
    throw new Error("No url returned");
  }

  redirect(data.url);
};
