import { RepositoryTypeButtonProps } from "@/types/repo-type-button-type";

type PersonalRepositoryTypeButtonProps = Omit<RepositoryTypeButtonProps, "clickOrganizations">;

export function PersonalRepositoryTypeButton({
  isPersonalClicked,
  clickPersonal,
  DrawingIcon,
  repositoryTypeText,
}: PersonalRepositoryTypeButtonProps) {
  return (
    <div
      className={`w-1/2 py-2 flex items-center justify-center rounded ${isPersonalClicked && "bg-white"}`}
      onClick={clickPersonal}
    >
      <DrawingIcon className="mr-2" />
      <span className="text-sm text-gray-500">{repositoryTypeText}</span>
    </div>
  );
}
