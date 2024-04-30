import Link from "next/link";

interface RepoNameblockProps {
  name: string;
  repoId: number;
}

export function RepoNameBlock({ name, repoId }: RepoNameblockProps) {
  return (
    // <div className="whitespace-nowrap overflow-hidden overflow-ellipsis pl-3 p-2 hover:bg-dropbox-hover active:bg-dropbox-click">{name}</div>
    <Link 
      href={`/share/post/${repoId}`}
      className="block whitespace-nowrap overflow-hidden overflow-ellipsis pl-3 p-2 hover:bg-dropbox-hover active:bg-dropbox-click">
      {name}
    </Link>
  );
}