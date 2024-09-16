import { FaFileUpload } from "react-icons/fa";
import { EnvFileSelectButton } from "./env-file-select-button";

export function BeforeUploadDropZoneContent({ open }: { open: () => void }) {
  return (
    <>
      <FaFileUpload size={40} />
      <span className="mt-4">
        ここにenvファイルをドラッグ & ドロップしてください
      </span>
      <span className="text-gray-400 text-sm">または</span>
      <EnvFileSelectButton open={open} />
    </>
  );
}
