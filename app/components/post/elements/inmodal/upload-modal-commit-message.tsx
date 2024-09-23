import { Dispatch, SetStateAction } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface UploadModalCommitMessageProps {
  setCommitMessage: Dispatch<SetStateAction<string>>;
}

export function UploadModalCommitMessage({ setCommitMessage }: UploadModalCommitMessageProps) {
  return (
    <div className="mt-1">
      <div className="flex items-center">
        <IoAlertCircleOutline className="mr-1" />
        <p className="text-sm">以下の入力欄でコミットメッセージを決められます。</p>
      </div>
      <input
        placeholder="コミットメッセージを入力してください"
        className="w-full rounded border p-1 mt-1"
        onChange={(e) => setCommitMessage(e.target.value)}
      />
    </div>
  );
}
