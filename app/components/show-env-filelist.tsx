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
    <div className="mx-10 h-[calc(100vh-160px-320px-40px)] my-5 flex">
      {linkedFileData.map(file => (
        <EnvFileCard key={file.name} fileName={file.name} updatedAt={file.updatedAt} repositoryId={repositoryId} />
      ))}
      <PostGetNavigetionCard calledUrl={calledUrl} />
    </div>
  )
}