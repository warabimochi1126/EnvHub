import { IconType } from "react-icons";

export interface RepositoryTypeButtonProps {
  isPersonalClicked: boolean;
  clickPersonal: () => void;
  clickOrganizations: () => void;
  DrawingIcon: IconType;
  repositoryTypeText: string;
}
