import EnvFileCard from "./env-file-card"
import PostGetNavigetionCard from "./post-get-navigation";

interface linkedFileData {
  linkedFileData: {
    name: string;
    updatedAt: string[];
  }[],
  repositoryId: string;
  calledUrl: string;
}

export default function ShowEnvFileList({ linkedFileData, repositoryId, calledUrl }: linkedFileData) {
  return (
    <div className={calledUrl === "post" ?
      "mx-10 h-[234px] mt-5 flex overflow-x-scroll w-[calc(100vw-240px-80px)] scrollbar-filelist" :
      "mx-10 h-[calc(100vh-160px-320px-40px)] mb-5 flex flex-wrap w-[calc(100vw-240px-80px)]"}>
      {linkedFileData.map(file => (
        <EnvFileCard key={file.name} fileName={file.name} updatedAt={file.updatedAt} repositoryId={repositoryId} calledUrl={calledUrl} />
      ))}
      <PostGetNavigetionCard calledUrl={calledUrl} />
    </div>
  )
}