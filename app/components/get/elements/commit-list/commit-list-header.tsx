import { IoGitBranchOutline } from "react-icons/io5";

export function CommitListHeader() {
  return (
    <div className="flex items-center p-3">
      <IoGitBranchOutline className="text-blue-400 mr-2" size={25} />
      <span className="font-bold text-xl">最近のアップロード履歴</span>
    </div>
  );
}
