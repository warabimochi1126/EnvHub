import { FaCodeBranch } from "react-icons/fa";

export function CommitListHeader() {
  return (
    <div className="flex items-center">
      <FaCodeBranch className="text-blue-500 mr-2" />
      <h1 className="font-bold text-xl">コミット履歴</h1>
    </div>
  );
}
