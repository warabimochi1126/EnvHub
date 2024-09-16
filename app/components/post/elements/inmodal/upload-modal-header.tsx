import { IoMdClose } from "react-icons/io";

export function UploadModalHeader({ modalClose }: { modalClose: () => void }) {
  return (
    <div className="flex justify-between">
      <span className="font-bold text-lg">アップロードの確認</span>
      <IoMdClose
        size={35}
        onClick={modalClose}
        className="hover:bg-gray-200 rounded-full transition-colors duration-200 p-1.5 relative -top-2 left-2"
      />
    </div>
  );
}
