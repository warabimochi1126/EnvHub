import { convertToJSTFormat } from "@/utils/dateUtils";
import { fileSizeByteToKB } from "@/utils/fileUtils";
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

interface FileListItemProps {
  fileName: string;
  createdAt: string;
  size: number;
}

// TODO:後で横揃えて大きさ合わせる
export function FileListItem({ fileName, createdAt, size }: FileListItemProps) {
  return (
    <div className="flex items-center">
      <FaFileAlt size={30} className="text-yellow-400 mr-3" />
      <div>
        <p className="font-bold text-sm">{fileName}</p>
        <p className="text-gray-400 text-sm">{fileSizeByteToKB(size)}</p>
        <p className="text-gray-400 text-sm">{convertToJSTFormat(createdAt)}</p>
      </div>
      <div className="border py-2 px-3 rounded-lg border-gray-400 hover:bg-gray-400 transition-colors duration-300 ml-5">
        <FaDownload size={16} />
      </div>
    </div>
  );
}
