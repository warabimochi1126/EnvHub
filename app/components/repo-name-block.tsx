"use client";

import { useStore } from "@/store/repositoryGlobalState";
import Link from "next/link";

interface RepoNameblockProps {
  name: string;
  repoId: number;
  redirectTo: string;
}

export function RepoNameBlock({ name, repoId, redirectTo }: RepoNameblockProps) {
  const { selectedRepositoryName, setSelectedRepositoryName } = useStore((state) => ({
    selectedRepositoryName: state.selectedRepositoryName,
    setSelectedRepositoryName: state.setSelectedRepositoryName
  }));


  return (
    <Link 
      href={`/share/${redirectTo}/${repoId}`}
      className={selectedRepositoryName === name ? 
        "block whitespace-nowrap overflow-hidden overflow-ellipsis pl-3 p-2 hover:bg-dropbox-hover bg-dropbox-click" :
        "block whitespace-nowrap overflow-hidden overflow-ellipsis pl-3 p-2 hover:bg-dropbox-hover active:bg-dropbox-click"}
      onClick={() => setSelectedRepositoryName(name)}>
      {name}
    </Link>
  );
}