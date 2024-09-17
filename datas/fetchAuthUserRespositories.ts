import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RepositoryList } from "@/types/fetchRepositoryType";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

// TODO:バージョンアップ後に削除する
export async function fetchAuthenticatedUserRepositoryNames() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;

  /* TODO:場当たり的な対処をしている
  https://github.com/warabimochi1126/EnvHub/issues/123
   */
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

async function getAuthUserProviderToken(): Promise<string> {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  const providerToken = data.session?.provider_token;
  if (!providerToken) {
    redirect("/");
  }

  return providerToken;
}

async function fetchAuthUserOrgsNames(
  providerToken: string
): Promise<string[]> {
  // prettier-ignore
  const response = await fetch("https://api.github.com/user/orgs?per_page=100", {
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      cache: "no-store",
    }
  );

  // prettier-ignore
  const fetchOrgsData: RestEndpointMethodTypes["orgs"]["listForAuthenticatedUser"]["response"]["data"] = await response.json();
  const fetchOrgsNames = fetchOrgsData.map((orgData) => orgData.login);

  return fetchOrgsNames;
}

async function fetchAuthUserRepoInOrgsNames(
  orgNames: string[],
  providerToken: string
): Promise<{ orgName: string; repoNames: string[] }[]> {
  const repoInOrgsNames = await Promise.all(
    orgNames.map(async (orgName) => {
      // prettier-ignore
      const response = await fetch(`https://api.github.com/orgs/${orgName}/repos?sort=updated&per_page=100`, {
        headers: {
          Authorization: `Bearer ${providerToken}`,
        },
        cache: "no-store",
      }
    );
      // prettier-ignore
      const fetchrepoInOrgsData: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"] = await response.json();
      const fetchrepoInOrgsNames = fetchrepoInOrgsData.map((data) => data.name);
      return {
        orgName,
        repoNames: fetchrepoInOrgsNames,
      };
    })
  );

  return repoInOrgsNames;
}

async function fetchAuthUserRepoNames(
  providerToken: string
): Promise<string[]> {
  // prettier-ignore
  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      cache: "no-store",
    }
  );

  // prettier-ignore
  const fetchReposData: RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"] = await response.json();
  const fetchRepoNames = fetchReposData.map(
    (fetchRepoData) => fetchRepoData.name
  );

  return fetchRepoNames;
}

export async function fetchRepoNames() {
  const providerToken = await getAuthUserProviderToken();

  return fetchAuthUserRepoNames(providerToken);
}

export async function fetchOrgsLinkRepoNames() {
  const providerToken = await getAuthUserProviderToken();
  const orgNames = await fetchAuthUserOrgsNames(providerToken);

  return await fetchAuthUserRepoInOrgsNames(orgNames, providerToken);
}
