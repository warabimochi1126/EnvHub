import { toast } from "react-toastify";
import RepositoryNameDisplay from "@/app/components/repository-name-display";
import { fetchLinkedEnvFileNames } from "@/datas/fetchLinkedFileNames";
import ShowEnvFileList from "@/app/components/show-env-filelist";
import { EnvFileNotFound } from "@/app/components/envfile-notfound";
import PostGetNavigetionCard from "@/app/components/post-get-navigation";

interface RepositoryIdPostProps {
  params: {
    repositoryId: string
  }
}

type linkedFileData = {
    name: string;
    updatedAt: string[];
}[]

export default async function Get({ params }: RepositoryIdPostProps) {
  const { isError, errorMessage, linkedFileData } = await fetchLinkedEnvFileNames(params.repositoryId);

  // レスポンスのエラーをtoast表示する
  if(isError) {
    toast.error(errorMessage, {
      theme: "colored",
      autoClose: 2000
    });
  }
  
  const hasLinkedFiledata = Array.isArray(linkedFileData) && linkedFileData.length !== 0;

  return (
    <div className="flex-grow">
      <RepositoryNameDisplay /> 
        { hasLinkedFiledata ? (
          <ShowEnvFileList linkedFileData={linkedFileData as linkedFileData} repositoryId={params.repositoryId} calledUrl="get" />
      ) : (
        <EnvFileNotFound calledUrl="get" />
      )}
      </div>
  )
}