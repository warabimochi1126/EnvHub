import DragAndDropZone from "@/app/components/drag-and-drop-zone";
import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories"

export default async function Get() {
  const repoNames = await fetchAuthenticatedUserRepositoryNames();

  return (
  <div className="flex">
    <ShowRepositories  repoNames={repoNames}/>
    <DragAndDropZone />
  </div>
  );
}