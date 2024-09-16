"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ProgressBar } from "../elements/progress-bar";
import { UploadPreviewFileContent } from "../elements/upload-preview-file-content";
import { UploadConfirmButton } from "../elements/upload-confirm-button";

interface FileUploadPreviewAreaProps {
  dropFiles: File[];
  setDropFiles: Dispatch<SetStateAction<File[]>>;
}

export function FileUploadPreviewArea({
  dropFiles,
  setDropFiles,
}: FileUploadPreviewAreaProps) {
  const [progressPercent, setProgressPercent] = useState<number>(0);

  return (
    <div className="w-11/12 mx-auto mt-10 border-2 rounded-lg p-4">
      <p className="font-bold mb-2">アップロード中のファイル:</p>
      {dropFiles.length === 0 ? (
        <p>アップロード中のファイルはありません。</p>
      ) : (
        <>
          <ProgressBar
            progressPercent={progressPercent}
            setProgressPercent={setProgressPercent}
          />
          {dropFiles.map((dropFile, index) => (
            <UploadPreviewFileContent
              dropFile={dropFile}
              index={index}
              setDropFiles={setDropFiles}
            />
          ))}
          {progressPercent === 100 ? (
            // prettier-ignore
            <UploadConfirmButton uploadFiles={dropFiles} isButtonEnabled={true} />
          ) : (
            // prettier-ignore
            <UploadConfirmButton uploadFiles={dropFiles} isButtonEnabled={false} />
          )}
        </>
      )}
    </div>
  );
}
