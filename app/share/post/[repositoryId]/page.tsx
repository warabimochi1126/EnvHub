import DragAndDropZone from "@/app/components/drag-and-drop-zone";
import ShowEnvFileList from "@/app/components/show-env-filelist";
import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories"
import { fetchLinkedEnvFileNames } from "@/datas/fetchLinkedFileNames";
import { notFound } from "next/navigation";

interface RepositoryIdPostProps {
  params: {
    repositoryId: string
  }
}

type linkedFileData = {
  name: string; 
  updatedAt: string[]
}[]

export default async function Post({ params }: RepositoryIdPostProps) {
  const repoNames = await fetchAuthenticatedUserRepositoryNames();

  const { isError, errorMessage, linkedFileData } = await fetchLinkedEnvFileNames(params.repositoryId);

  // TODO:notFound.tsxを実装する
  if(isError) {
    notFound();
  }

  return (
  <div className="flex">
    <ShowRepositories  repoNames={repoNames}/>
    <div className="flex-grow">
      <div className="mt-40"></div>
      <DragAndDropZone repositoryId={params.repositoryId} />
      <ShowEnvFileList linkedFileData={linkedFileData as linkedFileData}/>
    </div>
  </div>
  );
}