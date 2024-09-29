import { FaUser } from "react-icons/fa";
import { convertToJSTFormat } from "@/utils/dateUtils";

interface CommitListContentProps {
  commit_message: string;
  commiter_name: string;
  created_at: string;
}

export function CommitListContent({ commit_message, commiter_name, created_at }: CommitListContentProps) {
  return (
    <div>
      <p className="font-semibold">
        {commit_message ? commit_message : `${convertToJSTFormat(created_at)} のコミット`}
      </p>
      <p className="text-gray-500 text-sm flex items-center">
        <FaUser className="mr-1" />
        {commiter_name}
      </p>
      <p className="text-gray-500 text-sm">{convertToJSTFormat(created_at)}</p>
    </div>
  );
}
