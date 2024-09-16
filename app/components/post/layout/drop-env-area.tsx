"use client";

import { useState } from "react";
import { FileUploadArea } from "./file-upload-area";
import { FileUploadPreviewArea } from "./file-upload-preview-area";

export function DropEnvArea() {
  const [dropFiles, setDropFiles] = useState<File[]>([]);

  return (
    <>
      <FileUploadArea dropFiles={dropFiles} setDropFiles={setDropFiles} />
      <FileUploadPreviewArea
        dropFiles={dropFiles}
        setDropFiles={setDropFiles}
      />
    </>
  );
}
