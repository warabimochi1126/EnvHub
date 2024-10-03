"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ProgressBar } from "../elements/progress-bar";
import { UploadPreviewFileContent } from "../elements/upload-preview-file-content";
import { UploadConfirmButton } from "../elements/upload-confirm-button";
import { useRepoDataStore } from "@/store/repositoryGlobalState";

interface FileUploadPreviewAreaProps {
  dropFiles: File[];
  setDropFiles: Dispatch<SetStateAction<File[]>>;
}

export function FileUploadPreviewArea({ dropFiles, setDropFiles }: FileUploadPreviewAreaProps) {
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const { selectedRepoData } = useRepoDataStore();

  return (
    <div className="w-11/12 mx-auto my-10 border-2 rounded-lg p-4 scrollbar overflow-y-scroll max-h-[480px]">
      <p className="font-bold mb-2">アップロード中のファイル:</p>
      {dropFiles.length === 0 ? (
        <p>アップロード中のファイルはありません。</p>
      ) : (
        <>
          <ProgressBar progressPercent={progressPercent} setProgressPercent={setProgressPercent} />
          {dropFiles.map((dropFile, index) => (
            <UploadPreviewFileContent
              key={dropFile.name}
              dropFile={dropFile}
              index={index}
              setDropFiles={setDropFiles}
            />
          ))}
          {progressPercent === 100 && selectedRepoData.repoId && selectedRepoData.repoName ? (
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
