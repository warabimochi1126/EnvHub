"use client";

import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { BeforeUploadDropZoneContent } from "../elements/before-upload-drop-zone-content";
import { AfterUploadDropZoneContent } from "../elements/after-upload-drop-zone-content";

interface FileUploadAreaProps {
  dropFiles: File[];
  setDropFiles: Dispatch<SetStateAction<File[]>>;
}

export function FileUploadArea({
  dropFiles,
  setDropFiles,
}: FileUploadAreaProps) {
  const onDrop = (dropFiles: File[]) => {
    setDropFiles(dropFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div
      className="border-2 border-dashed hover:border-gray-400 hover:bg-gray-200 transition-colors duration-500 rounded-xl mx-auto w-11/12 h-80 flex justify-center items-center mt-20"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {dropFiles.length === 0 ? (
          <BeforeUploadDropZoneContent open={open} />
        ) : (
          <AfterUploadDropZoneContent open={open} dropFiles={dropFiles} />
        )}
      </div>
    </div>
  );
}
