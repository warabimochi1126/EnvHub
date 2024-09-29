"use client";

import { useRepoDataStore } from "@/store/repositoryGlobalState";

export function CommitListTemp() {
  const { selectedRepoData } = useRepoDataStore();

  return (
    <p>
      選択repoName:{selectedRepoData.repoName}repoId:{selectedRepoData.repoId}
    </p>
  );
}
