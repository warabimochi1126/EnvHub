import { FaArrowRight } from "react-icons/fa";

export function UploadSuccessModalButton() {
  return (
    <button className="w-full border rounded-lg py-2 flex items-center justify-center text-white bg-green-600 hover:bg-green-500 transition-colors duration-300">
      アップロードを確認する
      <FaArrowRight className="ml-2" />
    </button>
  );
}
