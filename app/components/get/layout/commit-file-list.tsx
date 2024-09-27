import { CommitFileListHeader } from "../elements/commit-file-list/commit-file-list-header";
import { FileListItem } from "../elements/commit-file-list/file-list-item";

export async function CommitFileList() {
  const response = await fetch("http://localhost:3000/api/repositories/786320505/commits/latest/files");
  const data = await response.json();

  return (
    <div className="w-11/12 h-80 mt-5 mx-auto border border-black rounded-lg">
      <CommitFileListHeader />
      <FileListItem />
    </div>
  );
}
