"use client";

import { useState } from "react";
import { FileUploadArea } from "./file-upload-area";
import { FileUploadPreviewArea } from "./file-upload-preview-area";
import { useRepoDataStore } from "@/store/repositoryGlobalState";

export function DropEnvArea() {
  const [dropFiles, setDropFiles] = useState<File[]>([]);
  const { selectedRepoData } = useRepoDataStore();

  return (
    <>
      <p>
        選択repoName:{selectedRepoData.repoName}repoId:{selectedRepoData.repoId}
      </p>
      <FileUploadArea dropFiles={dropFiles} setDropFiles={setDropFiles} />
      <FileUploadPreviewArea
        dropFiles={dropFiles}
        setDropFiles={setDropFiles}
      />
    </>
  );
}
