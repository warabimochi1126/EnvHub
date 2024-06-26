import "server-only"

import { createClient } from "@/lib/supabase/server";
import { RepositoryList } from "@/types/fetchRepositoryType";
import { redirect } from "next/navigation";

export async function fetchAuthenticatedUserRepositoryNames() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  const providerToken = data.session?.provider_token!;
  
  if(!providerToken) {
    redirect("/login");
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