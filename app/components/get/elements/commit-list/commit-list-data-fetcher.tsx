"use client";

import { useRepoDataStore } from "@/store/repositoryGlobalState";
import { CommitListItem } from "./commit-list-item";
import { useEffect, useState } from "react";
import { CommmitListLoader } from "./commit-list-loader";
import { CommitNotFound } from "./commit-not-found";

interface CommitListResponse {
  commit_list: {
    commit_uuid: string;
    commit_message: string;
    commiter_name: string;
    created_at: string;
  }[];
}

interface CommitListItem {
  commit_uuid: string;
  commit_message: string;
  commiter_name: string;
  created_at: string;
}

export function CommitListDataFetcher() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commitList, setCommitList] = useState<CommitListItem[]>([]);

  // TODO:カスタムフックに切り分けたい
  // useを使う必要がありそう,https://ja.react.dev/reference/react/Suspense#displaying-a-fallback-while-content-is-loading
  const { selectedRepoData } = useRepoDataStore();
  useEffect(() => {
    (async () => {
      if (!selectedRepoData.repoId) return null;

      setIsLoading(true);
      // prettier-ignore
      const response = await fetch(`http://localhost:3000/api/repositories/${selectedRepoData.repoId}/commits`);
      if (!response.ok) {
        setCommitList([]);
        setIsLoading(false);
        return;
      }

      const { commit_list: commitList } = (await response.json()) as CommitListResponse;
      if (!commitList) {
        setCommitList([]);
        setIsLoading(false);
        return;
      }

      setCommitList(commitList);
      setIsLoading(false);
    })();
  }, [selectedRepoData.repoId]);

  return (
    <>
      {isLoading ? (
        <CommmitListLoader />
      ) : commitList.length > 0 ? (
        commitList.map((commit, index) => (
          <div key={index} className="h-[86px] mx-5 rounded-lg">
            <CommitListItem
              commit_uuid={commit.commit_uuid}
              commit_message={commit.commit_message}
              commiter_name={commit.commiter_name}
              created_at={commit.created_at}
            />
          </div>
        ))
      ) : (
        <CommitNotFound />
      )}
    </>
  );
}
