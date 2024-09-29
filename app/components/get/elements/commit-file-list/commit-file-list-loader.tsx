import { ClipLoader } from "react-spinners";

export function CommitFileListLoader() {
  return (
    <div className="flex justify-center items-center h-[266px]">
      <ClipLoader className="text-blue-600" color="#2563eb " />
    </div>
  );
}
