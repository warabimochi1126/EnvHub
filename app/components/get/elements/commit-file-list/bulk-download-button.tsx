import { RiDownloadCloud2Line } from "react-icons/ri";

export function BulkDownloadButton() {
  return (
    <button className="flex items-center m-3 border border-gray-300 py-1 px-2 rounded-md">
      <RiDownloadCloud2Line size={20} className="text-blue-500 mr-1" />
      <span className="text-sm">一括ダウンロード</span>
    </button>
  );
}
