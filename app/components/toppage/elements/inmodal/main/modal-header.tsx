import { FiGithub } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

interface ModalHeaderProps {
  modalCloseFunc: () => void;
}

export function ModalHeader({ modalCloseFunc }: ModalHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <FiGithub size={22} className="mr-1" />
        <span className="text-lg font-bold">GitHub Login</span>
      </div>
      <IoMdClose
        size={34}
        onClick={modalCloseFunc}
        className="cursor-pointer rounded-full hover:bg-gray-200 p-1.5 transition-colors duration-200 relative -top-3 left-3"
      />
    </div>
  );
}
