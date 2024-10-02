import { PersonalRepositoryTypeButton } from "./personal-repo-type-button";
import { OrganizationsRepositoryTypeButton } from "./organizations-repo-type-button";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

interface PersonalOrganizationSelctorProps {
  isPersonalClicked: boolean;
  clickPersonal: () => void;
  clickOrganizations: () => void;
}

export function PersonalOrganizationSelctor({
  isPersonalClicked,
  clickPersonal,
  clickOrganizations,
}: PersonalOrganizationSelctorProps) {
  return (
    <div className="w-11/12 bg-gray-100 mx-auto my-3 p-1 rounded-md flex">
      <PersonalRepositoryTypeButton
        isPersonalClicked={isPersonalClicked}
        clickPersonal={clickPersonal}
        DrawingIcon={FaUser}
        repositoryTypeText="個人"
      />
      <OrganizationsRepositoryTypeButton
        isPersonalClicked={isPersonalClicked}
        clickOrganizations={clickOrganizations}
        DrawingIcon={FaUsers}
        repositoryTypeText="組織"
      />
    </div>
  );
}
