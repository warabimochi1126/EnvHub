import { EnvFileImg } from "./env-file-image";

interface EnvFileCardProps {
  fileName: string;
  updatedAt: string[]
}

export default function EnvFileCard({ fileName, updatedAt }: EnvFileCardProps) {

  return (
    <div className="mr-10">
    <EnvFileImg />
    <div className="w-40 pl-2">
      <p className="whitespace-normal overflow-hidden overflow-ellipsis">{ fileName }</p>
      <p className="whitespace-normal overflow-hidden overflow-ellipsis text-xs text-gray-500">{ updatedAt[0] }</p>
      <p className="whitespace-normal overflow-hidden overflow-ellipsis text-xs text-gray-500">{ updatedAt[1] }</p>
    </div>
    </div>
  )
}