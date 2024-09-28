"use client";

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

// TODO:後で横揃えて大きさ合わせる
export function FileListItem({ fileName, createdAt, size }: FileListItemProps) {
  const router = useRouter();

  const download = async () => {
    // prettier-ignore
    const response = await fetch("http://localhost:3000/api/repositories/786320505/commits/5238861a-8057-49c6-8412-5355426cdd54/files/download/.env.local");
    const signedUrlData = (await response.json()) as SingleDownloadResponse;

    router.push(signedUrlData.signedUrl);
  };

  return (
    <div className="flex items-center">
      <FaFileAlt size={30} className="text-yellow-400 mr-3" />
      <div>
        <p className="font-bold text-sm">{fileName}</p>
        <p className="text-gray-400 text-sm">{fileSizeByteToKB(size)}</p>
        <p className="text-gray-400 text-sm">{convertToJSTFormat(createdAt)}</p>
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
