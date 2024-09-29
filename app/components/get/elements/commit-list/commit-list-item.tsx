"use client";

import { FaCircleDot } from "react-icons/fa6";
import { CommitListContent } from "./commit-list-content";
import { EyeMark } from "./eye-mark";
import { useCommitDataStore, useRepoDataStore } from "@/store/repositoryGlobalState";

interface CommitListItemProps {
  commit_uuid: string;
  commit_message: string;
  commiter_name: string;
  created_at: string;
}

export function CommitListItem({
  commit_uuid,
  commit_message,
  commiter_name,
  created_at,
}: CommitListItemProps) {
  const { selectedRepoData } = useRepoDataStore();
  const { selectedCommitData, setSelectedCommitData } = useCommitDataStore();

  const saveCommitDetailsToGlobalState = () => {
    setSelectedCommitData({ repoId: selectedRepoData.repoId, commitUuid: commit_uuid });
  };

  return (
    <div
      className={`flex justify-between hover:bg-blue-100 transition-colors duration-300 rounded py-2 px-4 ${
        commit_uuid === selectedCommitData.commitUuid ? "bg-blue-200" : null
      }`}
      onClick={() => saveCommitDetailsToGlobalState()}
    >
      <div className="flex items-center">
        <FaCircleDot className="text-blue-500 mr-2" size={16} />
        <CommitListContent
          commit_message={commit_message}
          commiter_name={commiter_name}
          created_at={created_at}
        />
      </div>
      <EyeMark />
    </div>
  );
}
