import { FaCircleDot } from "react-icons/fa6";
import { CommitListContent } from "./commit-list-content";
import { EyeMark } from "./eye-mark";

interface CommitListItemProps {
  commit_message: string;
  commiter_name: string;
  created_at: string;
}

export function CommitListItem({ commit_message, commiter_name, created_at }: CommitListItemProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <FaCircleDot className="text-blue-500 mr-2" size={16} />
        <CommitListContent
          commit_message={commit_message}
          commiter_name={commiter_name}
          created_at={created_at}
        />
      </div>
      <EyeMark />
    </div>
  );
}
