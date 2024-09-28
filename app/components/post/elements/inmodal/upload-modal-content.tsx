import { fileSizeByteToKB } from "@/utils/fileUtils";

export function UploadModalContent({ uploadFiles }: { uploadFiles: File[] }) {
  return (
    <>
      <p className="text-sm">以下のファイルをアップロードします。確認してください。</p>
      <div className="mt-4">
        {uploadFiles.map((uploadFile, index) => (
          <div key={index} className="flex justify-between">
            <span>{uploadFile.name}</span>
            <span>{fileSizeByteToKB(uploadFile.size)}</span>
          </div>
        ))}
      </div>
    </>
  );
}
