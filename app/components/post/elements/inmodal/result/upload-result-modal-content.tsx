"use client";

import { UploadFailModalButton } from "./fail/upload-fail-modal-button";
import { UploadFailModalContent } from "./fail/upload-fail-modal-content";
import { UploadSuccessModalButton } from "./success/upload-success-modal-button";
import { UploadSuccessModalContent } from "./success/upload-success-modal-content";

interface UploadResultModalContentProps {
  result: "SUCCESS" | "FAIL";
}

export function UploadResultModalContent({ result }: UploadResultModalContentProps) {
  return (
    <div>
      <h1 className="font-bold text-lg">アップロード結果</h1>
      <div className="flex flex-col justify-center items-center">
        {result === "SUCCESS" ? <UploadSuccessModalContent /> : <UploadFailModalContent />}
      </div>
      <hr className="mt-2 h-2" />
      {result === "SUCCESS" ? <UploadSuccessModalButton /> : <UploadFailModalButton />}
    </div>
  );
}
