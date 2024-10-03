"use client";

import { useState } from "react";
import { FileUploadArea } from "./file-upload-area";
import { FileUploadPreviewArea } from "./file-upload-preview-area";
import { FileUploadHeader } from "./file-upload-header";

export function DropEnvArea() {
  const [dropFiles, setDropFiles] = useState<File[]>([]);

  return (
    <>
      <FileUploadHeader />
      <FileUploadArea dropFiles={dropFiles} setDropFiles={setDropFiles} />
      <FileUploadPreviewArea dropFiles={dropFiles} setDropFiles={setDropFiles} />
    </>
  );
}
