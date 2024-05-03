"use client";

import RepoSearchBar from "./repo-search-bar";
import { RepoNameBlock } from "./repo-name-block";
import { useStore } from "@/store/repositoryGlobalState";
import { useGetRedirectPath } from "../hooks/useGetRedirectPath";

interface repoNames {
  repoNames: {
    id: number;
    name: string;
  }[]
};

export default function ShowRepositories({ repoNames }: repoNames) {
  const repositorySearchStr = useStore((state) => state.repositorySearchStr);

  const redirectPath = useGetRedirectPath();
  
  return (
    <div className="bg-dropbox-background h-screen w-60">
      <RepoSearchBar />

      <div className="w-60 h-[calc(100vh-96px-40px-20px)] mt-5 overflow-y-scroll scrollbar">
      {repoNames
      .filter(repoName => repoName.name.includes(repositorySearchStr))
      .map((repoName) => (
        <RepoNameBlock key={repoName.id} name={repoName.name} repoId={repoName.id} redirectTo={redirectPath}/>
      ))}
      </div>
    </div>
  );
}

// スクロールバーの作成は overflow-y-scroll
// テキストが改行されないように1行表示かつ語尾を...で丸めるには whitespace-nowrap overflow-hidden overflow-ellipsis
// 高さ等に与える値を計算して与えられる.[]の中に計算式を空白を開けずに記述する