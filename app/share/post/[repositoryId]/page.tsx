import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import DragAndDropZone from "@/app/components/drag-and-drop-zone";
import ShowEnvFileList from "@/app/components/show-env-filelist";
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
      <div className="mt-40"></div>
      <DragAndDropZone repositoryId={params.repositoryId} />
      <ShowEnvFileList linkedFileData={linkedFileData as linkedFileData}/>
    </div>
  );
}