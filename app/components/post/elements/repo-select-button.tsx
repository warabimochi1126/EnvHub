import { FcFolder } from "react-icons/fc";

interface RepoSelectButtonProps {
  repoName: string;
}

export function RepoSelectButton({ repoName }: RepoSelectButtonProps) {
  return (
    <div className="w-11/12 mx-auto border rounded p-2 flex items-center text-sm">
      <FcFolder className="mr-2" size={20} />
      <span>{repoName}</span>
    </div>
  );
}
