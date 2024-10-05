import "server-only";

import { createClient } from "@/lib/supabase/server";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export async function getAuthUserProviderToken(): Promise<string> {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  const providerToken = data.session?.provider_token;
  if (!providerToken) {
    throw new Error("providerTokenが取得出来ませんでした。");
  }

  return providerToken;
}

async function fetchAuthUserOrgsNames(providerToken: string): Promise<string[]> {
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
): Promise<
  {
    orgName: string;
    reposData: {
      repoId: number;
      repoName: string;
    }[];
  }[]
> {
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
      const fetchRepoInOrgsData: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"] = await response.json();
      const fetchrepoInOrgsNames = fetchRepoInOrgsData.map((data) => ({
        repoId: data.id,
        repoName: data.name,
      }));
      return {
        orgName,
        reposData: fetchrepoInOrgsNames,
      };
    })
  );

  return repoInOrgsNames;
}

async function fetchAuthUserRepoNames(
  providerToken: string
): Promise<{ repoId: number; repoName: string }[]> {
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
  const fetchRepoNames = fetchReposData.map((fetchRepoData) => ({
    repoId: fetchRepoData.id,
    repoName: fetchRepoData.name,
  }));

  return fetchRepoNames;
}

export async function fetchMyRepoNames() {
  const providerToken = await getAuthUserProviderToken();

  return fetchAuthUserRepoNames(providerToken);
}

export async function fetchOrgsLinkRepoNames() {
  const providerToken = await getAuthUserProviderToken();
  const orgNames = await fetchAuthUserOrgsNames(providerToken);

  return await fetchAuthUserRepoInOrgsNames(orgNames, providerToken);
}

// TODO:こちらはサーバサイドで使っているので後に移管する
// prettier-ignore
export async function isAuthUserRepository( repoId: number ): Promise<boolean> {  
  const [ myReposdata, OrgsData ] = await Promise.all([fetchMyRepoNames(), fetchOrgsLinkRepoNames()]);

  const hasRepoId = myReposdata.some(myRepoData => myRepoData.repoId === repoId);
  if (hasRepoId) return true;

  const hasOrgRepoId = OrgsData.some(OrgData => 
    OrgData.reposData.some(orgRepoData => orgRepoData.repoId === repoId)
  );
  if (hasOrgRepoId) return true;

  return false;
}
