import { IoLogoGithub } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface OrganizationsSelectButtonProps {
  organizationName: string;
  isAccordionClicked: boolean;
}

export function OrganizationsSelectButton({
  organizationName,
  isAccordionClicked,
}: OrganizationsSelectButtonProps) {
  return (
    <div className="w-11/12 mx-auto hover:bg-gray-200 transition-colors rounded flex items-center p-2 justify-between">
      <IoLogoGithub className="mr-2" size={20} />
      <span>{organizationName}</span>
      {isAccordionClicked ? (
        <FaChevronDown className="text-gray-400" size={20} />
      ) : (
        <FaChevronRight className="text-gray-400" size={20} />
      )}
    </div>
  );
}
