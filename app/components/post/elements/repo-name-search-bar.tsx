import { TbZoom } from "react-icons/tb";

export function RepoNameSearchBar() {
  return (
    <div className="relative w-11/12 mx-auto">
      <TbZoom className="absolute left-3 top-[11px]" size={20} />
      <input
        className="w-full flex items-center border py-2 px-10 rounded"
        placeholder="リポジトリ名で検索"
      />
    </div>
  );
}
