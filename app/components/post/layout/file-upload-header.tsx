import { useRepoDataStore } from "@/store/repositoryGlobalState";
import { GoFileDirectory } from "react-icons/go";

export function FileUploadHeader() {
  const { selectedRepoData } = useRepoDataStore();

  return (
    <div className="flex justify-between items-center h-20 w-11/12 mx-auto">
      <p className="font-bold text-xl">ファイルアップロード</p>
      {selectedRepoData.repoName ? (
        <div className="flex items-center bg-blue-200 px-2 rounded-xl">
          <GoFileDirectory className="text-blue-400 mr-2" />
          <p className="text-sm text-blue-600">{selectedRepoData.repoName}</p>
        </div>
      ) : (
        <p className="text-gray-300 text-sm">リポジトリを選択してください</p>
      )}
    </div>
  );
}
