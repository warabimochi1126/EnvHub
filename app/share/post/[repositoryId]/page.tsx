import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import DragAndDropZone from "@/app/components/drag-and-drop-zone";
import ShowEnvFileList from "@/app/components/show-env-filelist";
import { fetchLinkedEnvFileNames } from "@/datas/fetchLinkedFileNames";
import RepositoryNameDisplay from "@/app/components/repository-name-display";
import { EnvFileNotFound } from "@/app/components/envfile-notfound";


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
  const { isError, errorMessage, linkedFileData } = await fetchLinkedEnvFileNames(params.repositoryId);

  // レスポンスのエラーをtoast表示する
  if(isError) {
    toast.error(errorMessage, {
      theme: "colored",
      autoClose: 2000
    });
  }

  return (
    <div className="flex-grow">
      <RepositoryNameDisplay />
      <DragAndDropZone repositoryId={params.repositoryId} />
      { Array.isArray(linkedFileData) && linkedFileData.length !== 0 ? (
        <ShowEnvFileList linkedFileData={linkedFileData as linkedFileData} repositoryId={params.repositoryId} calledUrl="post" />
      ) : (
        <EnvFileNotFound calledUrl="post" />
      )}
    </div>
  );
}