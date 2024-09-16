export function UploadModalContent({ uploadFiles }: { uploadFiles: File[] }) {
  const fileSizeByteToKB = (fileSizeByte: number): string => {
    if (fileSizeByte < 1024) {
      return `${fileSizeByte} Byte`;
    }
    const fileSizeInKB = (fileSizeByte / 1024).toFixed(2);
    return `${fileSizeInKB} KB`;
  };

  return (
    <>
      <p className="text-sm">
        以下のファイルをアップロードします。確認してください。
      </p>
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
