import { IoLogoGithub } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface OrganizationsSelectButtonProps {
  organizationName: string;
  isAccordionClicked: boolean;
}

export function OrganizationsSelectButton({
  organizationName,
  isAccordionClicked,
}: OrganizationsSelectButtonProps) {
  return (
    <div className="w-11/12 mx-auto border rounded flex items-center p-2 justify-between">
      <IoLogoGithub className="mr-2" size={20} />
      <span>{organizationName}</span>
      {isAccordionClicked ? (
        <MdKeyboardDoubleArrowDown size={25} />
      ) : (
        <MdKeyboardDoubleArrowRight size={25} />
      )}
    </div>
  );
}
