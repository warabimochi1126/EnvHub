interface RepoNameblockProps {
  name: string;
}

export function RepoNameBlock({ name }: RepoNameblockProps) {
  return (
    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis pl-3 p-2 hover:bg-dropbox-hover active:bg-dropbox-click">{name}</div>
  );
}