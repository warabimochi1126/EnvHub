import Image from "next/image"

import { fileDownload } from "@/actions/fileDownload"
import fileIcon from "@/public/file-icon.svg"

interface EnvFileImgProps {
  repositoryId: string;
  fileName: string;
}

export function EnvFileImg({ repositoryId, fileName }: EnvFileImgProps) {
  const fileDownloadUrl = fileDownload.bind(null, repositoryId).bind(null, fileName);

  return (
    <form action={fileDownloadUrl}>
      <div className="relative group">
        <div className="bg-[#EBE9E6] w-40 h-40 rounded flex justify-center items-center">
          <Image src={fileIcon} alt="ファイルアイコン" width={50} height={50} />
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gray-600 rounded flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="text-white font-bold">ダウンロードする</button>
        </div>
      </div>
    </form>
  )
}