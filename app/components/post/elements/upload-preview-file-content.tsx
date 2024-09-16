import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegFile } from "react-icons/fa6";

interface UploadPreviewFileContentProps {
  dropFile: File;
  index: number;
  setDropFiles: Dispatch<SetStateAction<File[]>>;
}

export function UploadPreviewFileContent({
  dropFile,
  index,
  setDropFiles,
}: UploadPreviewFileContentProps) {
  return (
    <div key={dropFile.name} className="border flex p-3 justify-between">
      <div className="flex items-center">
        <FaRegFile size={20} className="mr-3" />
        <span className="text-sm">{dropFile.name}</span>
      </div>
      <AiOutlineClose
        size={20}
        className="hover:bg-gray-300 rounded-full transition-colors duration-500"
        onClick={() => setDropFiles((prev) => prev.splice(index, 1))}
      />
    </div>
  );
}
