import { FiRefreshCw } from "react-icons/fi";

export function UploadFailModalButton() {
  return (
    <button className="w-full border rounded-lg py-2 flex items-center justify-center text-white bg-red-500 hover:bg-red-400 transition-colors duration-300">
      <FiRefreshCw className="mr-2" />
      再アップロードを行う
    </button>
  );
}
