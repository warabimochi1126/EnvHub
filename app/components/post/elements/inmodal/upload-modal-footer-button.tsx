"use client";

import { useRepoDataStore } from "@/store/repositoryGlobalState";
import { Dispatch, SetStateAction } from "react";
import { CommitState } from "../upload-confirm-button";

interface UploadModalFooterButtonProps {
  modalClose: () => void;
  uploadFiles: File[];
  commitMessage: string;
  setCommitState: Dispatch<SetStateAction<CommitState>>;
}
// prettier-ignore
export function UploadModalFooterButton({ modalClose, uploadFiles, commitMessage, setCommitState }: UploadModalFooterButtonProps) {
  const { selectedRepoData } = useRepoDataStore();

  const confirmUpload = (uploadTargetFiles: File[]) => {
    const uploadRequestBody = new FormData();

    uploadTargetFiles.forEach((uploadTargetFile) => {
      uploadRequestBody.append("upload_target_files", uploadTargetFile);
    });
    uploadRequestBody.append("meta_data", JSON.stringify({
      repo_name: selectedRepoData.repoName,
      repo_id: selectedRepoData.repoId,
      commit_message: commitMessage
    }));

    setCommitState("DURING");
    
    const response = fetch("/api/uploads/confirm", {
      method: "POST",
      body: uploadRequestBody,
    });
  }

  return (
    <div className="flex justify-end space-x-2 mt-3">
      <button
        onClick={modalClose}
        className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-300"
      >
        キャンセル
      </button>
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-300" onClick={() => confirmUpload(uploadFiles)}>
        コミットを確定
      </button>
    </div>
  );
}
