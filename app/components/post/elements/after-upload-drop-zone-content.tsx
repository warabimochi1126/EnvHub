import { LiaCheckCircle } from "react-icons/lia";
import { EnvFileSelectButton } from "./env-file-select-button";

interface AfterUploadDropZoneContentProps {
  open: () => void;
  dropFiles: File[];
}

export function AfterUploadDropZoneContent({ open, dropFiles }: AfterUploadDropZoneContentProps) {
  return (
    <>
      <LiaCheckCircle size={40} className="text-green-300" />
      {dropFiles.length >= 2 ? (
        <span>
          {dropFiles[0].name} ...他{dropFiles.length - 1}件
        </span>
      ) : (
        <span>{dropFiles[0].name}</span>
      )}
      <EnvFileSelectButton open={open} />
    </>
  );
}
