import { fetchMyRepoNames, fetchOrgsLinkRepoNames } from "@/datas/fetchAuthUserRespositories";
import { RepositorySelctorArea } from "../components/post/layout/repository-selector-area";
import { CommitList } from "../components/get/layout/commit-list";
import { CommitFileList } from "../components/get/layout/commit-file-list";
import { CommitListTemp } from "../components/get/elements/commit-list/commit-list-temp";

export default async function Page() {
  const myRepoNames = await fetchMyRepoNames();
  const orgLinkRepoNames = await fetchOrgsLinkRepoNames();

  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen border-r border-black overflow-y-scroll scrollbar">
        <RepositorySelctorArea myRepoNames={myRepoNames} orgLinkRepoNames={orgLinkRepoNames} />
      </div>
      <div className="w-3/4 bg-white">
        <CommitListTemp />
        <h1 className="text-3xl font-bold w-11/12 mx-auto h-20">ファイル管理</h1>
        <CommitList />
        <CommitFileList />
      </div>
    </div>
  );
}
