import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories";
import ShowRepositories from "@/app/components/show-repositories";
import RepositoryPlaceholder from "@/app/components/repository-placeholder";

export default async function Post() {
  const repoNames = await fetchAuthenticatedUserRepositoryNames();

  return (
    <div className="flex">
      <ShowRepositories  repoNames={repoNames}/>
      <RepositoryPlaceholder />
    </div>
  )
}