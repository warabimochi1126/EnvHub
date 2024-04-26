import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories"

export default async function Get() {
  const repoNames = await fetchAuthenticatedUserRepositoryNames();

  return (
  <>
    <ShowRepositories  repoNames={repoNames}/>
  </>
  );
}