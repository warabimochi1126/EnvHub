"use client";

import { useStore } from "@/store/repositoryGlobalState";

export default function RepositoryNameDisplay() {
  const selectedRepositoryName = useStore((state) => state.selectedRepositoryName);

  return (
    <div className="h-40 mx-10 flex justify-center items-center text-gray-400">
      { selectedRepositoryName ? (
        <p>
          現在選択中のリポジトリは <span className="text-gray-800">{ selectedRepositoryName }</span> です。
        </p> 
      ) : (
        <p>現在リポジトリは選択されていません。</p>
      )}
    </div>
  )
}