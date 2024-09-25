import { MdError } from "react-icons/md";

export function UploadFailModalContent() {
  return (
    <>
      <MdError size={100} className="text-red-500" />
      <p className="text-red-400">アップロードに失敗しました。</p>
    </>
  );
}
