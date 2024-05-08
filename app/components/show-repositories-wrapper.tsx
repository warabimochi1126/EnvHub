import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories";
import ShowRepositories from "./show-repositories";

export default async function ShowRepositoriesWrapper() {
  const repoNames = await fetchAuthenticatedUserRepositoryNames();

  return (
    <ShowRepositories repoNames={repoNames}/>
  )
}