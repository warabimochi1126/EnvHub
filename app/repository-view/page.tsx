import { RepositorySelctorArea } from "../components/post/layout/repository-selector-area";
import { DropEnvArea } from "../components/post/layout/drop-env-area";
import {
  fetchOrgsLinkRepoNames,
  fetchRepoNames,
} from "@/datas/fetchAuthUserRespositories";

export default async function Page() {
  const repoNames = await fetchRepoNames();
  const orgLinkRepoNames = await fetchOrgsLinkRepoNames();

  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen border-r border-black overflow-y-scroll scrollbar">
        <RepositorySelctorArea
          repoNames={repoNames}
          orgLinkRepoNames={orgLinkRepoNames}
        />
      </div>
      <div className="w-3/4 bg-white">
        <DropEnvArea />
      </div>
    </div>
  );
}
