"use client";

import { useCommitDataStore } from "@/store/repositoryGlobalState";
import { CommitFileListHeader } from "../elements/commit-file-list/commit-file-list-header";
import { FileListItem } from "../elements/commit-file-list/file-list-item";
import { useEffect, useState } from "react";
import { CommitFileListLoader } from "../elements/commit-file-list/commit-file-list-loader";

interface CommitFileListResponse {
  name: string;
  created_at: string;
  metadata: {
    size: number;
  };
}

export function CommitFileList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commitFileList, setCommitFileList] = useState<CommitFileListResponse[]>([]);

  const { selectedCommitData } = useCommitDataStore();

  useEffect(() => {
    (async () => {
      if (!selectedCommitData.commitUuid) {
        setCommitFileList([]);
        return null;
      }
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/repositories/${selectedCommitData.repoId}/commits/${selectedCommitData.commitUuid}/files`
      );
      if (!response.ok) {
        setCommitFileList([]);
        setIsLoading(false);
        return;
      }

      const commitFileList = (await response.json()) as CommitFileListResponse[];
      if (!commitFileList) {
        setCommitFileList([]);
        setIsLoading(false);
        return;
      }

      setCommitFileList(commitFileList);
      setIsLoading(false);
    })();
  }, [selectedCommitData.repoId, selectedCommitData.commitUuid]);

  return (
    <div className="w-11/12 h-80 mt-5 mx-auto border border-black rounded-lg overflow-y-scroll scrollbar">
      <CommitFileListHeader />
      {isLoading ? (
        <CommitFileListLoader />
      ) : (
        <div className="flex flex-wrap m-10">
          {commitFileList.map((commitFile, index) => (
            <FileListItem
              key={index}
              fileName={commitFile.name}
              size={commitFile.metadata.size}
              createdAt={commitFile.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
