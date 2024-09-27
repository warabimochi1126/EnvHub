import { FaCircleDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

interface CommitListResopnse {
  commit_list: {
    commit_message: string;
    commiter_name: string;
    created_at: string;
  }[];
}

export async function CommitList() {
  // TODO:URL部分汎用化したい
  const response = await fetch("http://localhost:3000/api/repositories/786320505/commits");
  const { commit_list: commitList } = (await response.json()) as CommitListResopnse;

  return (
    <>
      <div className="mx-auto w-11/12 h-80 bg-gray-500 rounded">
        {commitList.map((commit, index) => (
          <div key={index} className="h-1/3 bg-white mx-5 rounded-lg">
            <div className="flex items-center">
              <FaCircleDot className="text-blue-500 mr-2" size={16} />

              <div>
                <p className="font-semibold">{commit.commit_message}</p>
                <p className="text-gray-500 text-sm flex items-center">
                  <FaUser className="mr-1" />
                  {commit.commiter_name}
                </p>
                <p className="text-gray-500 text-sm">{commit.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
