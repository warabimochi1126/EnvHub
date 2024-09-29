import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { BulkDownloadButton } from "./bulk-download-button";

export function CommitFileListHeader() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center p-3">
        <VscGitPullRequestNewChanges size={25} className="mr-2 text-blue-500" />
        <p className="font-bold text-xl">コミットに紐づくファイル</p>
      </div>
      <BulkDownloadButton />
    </div>
  );
}
