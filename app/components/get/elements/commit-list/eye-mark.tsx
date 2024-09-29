import { FaEye } from "react-icons/fa";

export function EyeMark() {
  return (
    <div className="flex items-center">
      <FaEye size={20} className="text-blue-500 mr-2" />
      <span className="text-xs text-blue-500">ファイルを表示</span>
    </div>
  );
}
