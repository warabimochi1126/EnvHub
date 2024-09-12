import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RepositoryList } from "@/types/fetchRepositoryType";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export async function fetchAuthenticatedUserRepositoryNames() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;

  if (!providerToken) {
    redirect("/");
  }

  // リポジトリの個数分やるとAPI側の回数制限に引っかかる可能性があるので最大100個で留めておく
  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      cache: "no-store",
    }
  );

  const fetchRepositoriesData: RepositoryList = await response.json();
  const fetchrepositoriesDataNames = fetchRepositoriesData.map((data) => ({
    id: data.id,
    name: data.name,
  }));

  return fetchrepositoriesDataNames;
}

export async function fetchAuthUserOrgsNames(providerToken: string) {
  // TODO:権限がなくてデータ取れてきてないっぽいのでトークン周り洗い出す
  // 多分 read:org が足りてなさそう

  const perPage = 100;
  const response = await fetch(
    `https://api.github.com/user/orgs?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      cache: "no-store",
    }
  );

  const fetchOrgsData: RestEndpointMethodTypes["orgs"]["listForAuthenticatedUser"]["response"] =
    await response.json();

  const fetchOrgsNames = fetchOrgsData.data.map((orgData) => ({
    orgName: orgData.login,
  }));

  return fetchOrgsNames;
}
