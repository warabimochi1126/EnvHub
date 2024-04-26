"use client";

import { ChangeEvent } from "react";
import ZoomScope from "./zoom-scope";
import { useStore } from "@/store/repositoryGlobalState";

export default function RepoSearchBar() {
  const { repositorySearchStr, setRepoSearchStr } = useStore((state) => ({
    repositorySearchStr: state.repositorySearchStr,
    setRepoSearchStr: state.setRepoSearchStr
  }));

  const inputCallback = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(repositorySearchStr);
    setRepoSearchStr(e.target.value);
  };

  return (
    <div className="text-center">
      <input value={repositorySearchStr} placeholder="リポジトリ名で検索" className="w-11/12 mt-24 border border-black rounded h-10 text-center" onChange={inputCallback}></input>
      <ZoomScope />
    </div>
  )
}