import "server-only"

import { createClient } from "@/lib/supabase/server";
import { RepositoryList } from "@/types/fetchRepositoryType";

export async function fetchAuthenticatedUserRepositoryNames() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;
  
  // TODO:providerTokenが取得出来なかった場合のエラーは呼び出してるコンポーネントに伝播するらしい
console.log(`providerToken:${providerToken}`);
  if(!providerToken) {
    throw new Error("provider_tokenが取得出来ませんでした。");
  }
  
  // リポジトリの個数分やるとAPI側の回数制限に引っかかる可能性があるので最大100個で留めておく
  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
    headers: {
      Authorization: `Bearer ${providerToken}`
    },
    cache: "no-store"
  });

  const fetchRepositoriesData: RepositoryList = await response.json();
  const fetchrepositoriesDataNames = fetchRepositoriesData.map((data) => ({ 
    id: data.id,
    name: data.name
  }));

  return fetchrepositoriesDataNames;
}