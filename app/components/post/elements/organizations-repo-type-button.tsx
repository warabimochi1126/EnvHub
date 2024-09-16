import { RepositoryTypeButtonProps } from "@/types/repo-type-button-type";

type OrganizationsRepositoryTypeButtonProps = Omit<RepositoryTypeButtonProps, "clickPersonal">;

export function OrganizationsRepositoryTypeButton({
  isPersonalClicked,
  clickOrganizations,
  DrawingIcon,
  repositoryTypeText,
}: OrganizationsRepositoryTypeButtonProps) {
  return (
    <div
      className={`w-1/2 py-2 flex items-center justify-center rounded  ${!isPersonalClicked && "bg-white"}`}
      onClick={clickOrganizations}
    >
      <DrawingIcon className="mr-2" />
      <span className="text-sm text-gray-500">{repositoryTypeText}</span>
    </div>
  );
}
