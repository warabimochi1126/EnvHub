import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories"

export default async function Get() {
  const fetchedRepositoriesNames = await fetchAuthenticatedUserRepositoryNames();

  return <></>
}