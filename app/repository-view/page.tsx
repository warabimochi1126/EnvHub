import { RepositorySelctorArea } from "../components/post/layout/repository-selector-area";
import { DropEnvArea } from "../components/post/layout/drop-env-area";

export default function Page() {
  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen border-r border-black">
        <RepositorySelctorArea />
      </div>
      <div className="w-3/4 bg-white">
        <DropEnvArea />
      </div>
    </div>
  );
}
