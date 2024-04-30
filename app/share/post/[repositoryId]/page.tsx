import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import DragAndDropZone from "@/app/components/drag-and-drop-zone";
import ShowEnvFileList from "@/app/components/show-env-filelist";
import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories"
import { fetchLinkedEnvFileNames } from "@/datas/fetchLinkedFileNames";


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

  // レスポンスのエラーをtoast表示する
  if(isError) {
    toast.error(errorMessage, {
      theme: "colored",
      autoClose: 2000
    });
  }

  return (
  <div className="flex">
    <ToastContainer />
    <ShowRepositories  repoNames={repoNames}/>
    <div className="flex-grow">
      <div className="mt-40"></div>
      <DragAndDropZone repositoryId={params.repositoryId} />
      <ShowEnvFileList linkedFileData={linkedFileData as linkedFileData}/>
    </div>
  </div>
  );
}