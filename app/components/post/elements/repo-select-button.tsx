"use client";

import { useCommitDataStore, useRepoDataStore } from "@/store/repositoryGlobalState";
import { FcFolder } from "react-icons/fc";

interface RepoSelectButtonProps {
  repoId: number;
  repoName: string;
}

export function RepoSelectButton({ repoName, repoId }: RepoSelectButtonProps) {
  const { selectedRepoData, setSelectedRepoData } = useRepoDataStore();
  const { setSelectedCommitData } = useCommitDataStore();

  const handleRepoSelect = () => {
    setSelectedRepoData({ repoName, repoId });
    setSelectedCommitData({ repoId: repoId, commitUuid: "" });
  };

  return (
    <div
      className={`w-11/12 mx-auto my-1 rounded p-2 flex items-center text-sm hover:bg-gray-300 transition-colors ${
        selectedRepoData.repoId === repoId && "bg-gray-300"
      }`}
      onClick={() => handleRepoSelect()}
    >
      <FcFolder className="mr-2" size={20} />
      <span>{repoName}</span>
    </div>
  );
}
