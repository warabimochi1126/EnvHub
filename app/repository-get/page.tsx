import { fetchMyRepoNames, fetchOrgsLinkRepoNames } from "@/datas/fetchAuthUserRespositories";
import { RepositorySelctorArea } from "../components/post/layout/repository-selector-area";
import { CommitList } from "../components/get/layout/commit-list";
import { CommitFileList } from "../components/get/layout/commit-file-list";
import { CommitListZoneHeader } from "../components/get/layout/commit-list-header";

export default async function Page() {
  const myRepoNames = await fetchMyRepoNames();
  const orgLinkRepoNames = await fetchOrgsLinkRepoNames();

  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen border-r overflow-y-scroll scrollbar">
        <RepositorySelctorArea myRepoNames={myRepoNames} orgLinkRepoNames={orgLinkRepoNames} />
      </div>
      <div className="w-3/4 bg-gray-100">
        <CommitListZoneHeader />
        <CommitList />
        <CommitFileList />
      </div>
    </div>
  );
}
