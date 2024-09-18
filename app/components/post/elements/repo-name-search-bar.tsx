"use client";

import { Dispatch, SetStateAction } from "react";
import { TbZoom } from "react-icons/tb";

interface RepoNameSearchBar {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

// prettier-ignore
export function RepoNameSearchBar({ searchQuery, setSearchQuery }: RepoNameSearchBar) {
  return (
    <div className="relative w-11/12 mx-auto">
      <TbZoom className="absolute left-3 top-[11px]" size={20} />
      <input
        className="w-full flex items-center border py-2 px-10 rounded"
        placeholder="リポジトリ名で検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
