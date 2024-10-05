"use client";

import { useCommitDataStore } from "@/store/repositoryGlobalState";
import { convertToJSTFormat } from "@/utils/dateUtils";
import { fileSizeByteToKB } from "@/utils/fileUtils";
import { useRouter } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

interface FileListItemProps {
  fileName: string;
  createdAt: string;
  size: number;
}

interface SingleDownloadResponse {
  signedUrl: string;
}

// 拡張子に基づいてファイルアイコンの色を取得する関数
function getEnvFileIconColor(fileName: string): string {
  const lowerFileName = fileName.toLowerCase();

  switch (lowerFileName) {
    case ".env":
      return "text-green-500";
    case ".env.local":
      return "text-blue-500";
    case ".env.development":
      return "text-yellow-500";
    case ".env.production":
      return "text-red-500";
    case ".env.test":
      return "text-purple-500";
    case ".env.staging":
      return "text-orange-500";
    case ".env.example":
      return "text-gray-500";
    default:
      return "text-emerald-700";
  }
}

export function FileListItem({ fileName, createdAt, size }: FileListItemProps) {
  const router = useRouter();
  const { selectedCommitData } = useCommitDataStore();

  const download = async () => {
    // prettier-ignore
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/repositories/${selectedCommitData.repoId}/commits/${selectedCommitData.commitUuid}/files/download/${fileName}`);
    const signedUrlData = (await response.json()) as SingleDownloadResponse;

    router.push(signedUrlData.signedUrl);
  };

  const iconColor = getEnvFileIconColor(fileName);

  return (
    <div className="flex items-center w-1/3 px-5 py-3 justify-between">
      <div className="flex items-center">
        <FaFileAlt size={30} className={`${iconColor} mr-3`} />
        <div>
          <p className="font-bold text-sm">{fileName}</p>
          <p className="text-gray-400 text-sm">{fileSizeByteToKB(size)}</p>
          <p className="text-gray-400 text-sm">{convertToJSTFormat(createdAt)}</p>
        </div>
      </div>
      <div
        className="border py-2 px-3 rounded-lg border-gray-400 hover:bg-gray-400 transition-colors duration-300 ml-5"
        onClick={() => download()}
      >
        <FaDownload size={16} />
      </div>
    </div>
  );
}
