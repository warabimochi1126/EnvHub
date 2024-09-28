import { fetchWithCookies } from "@/utils/apiUtils";
import { CommitFileListHeader } from "../elements/commit-file-list/commit-file-list-header";
import { FileListItem } from "../elements/commit-file-list/file-list-item";
import { cookies } from "next/headers";

interface CommitFileListResponse {
  name: string;
  created_at: string;
  metadata: {
    size: number;
  };
}

export async function CommitFileList() {
  const cookieStore = cookies();
  const cookieArray = cookieStore.getAll();

  // prettier-ignore
  const response = await fetchWithCookies("http://localhost:3000/api/repositories/786320505/commits/latest/files", cookieArray);
  const commitFileList = (await response.json()) as CommitFileListResponse[];

  return (
    <div className="w-11/12 h-80 mt-5 mx-auto border border-black rounded-lg">
      <CommitFileListHeader />
      {commitFileList.map((commitFile, index) => (
        <FileListItem
          key={index}
          fileName={commitFile.name}
          size={commitFile.metadata.size}
          createdAt={commitFile.created_at}
        />
      ))}
    </div>
  );
}
