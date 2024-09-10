import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface AgreeButtonProps {
  modalCloseFunc: () => void;
}

export function AgreeButton({ modalCloseFunc }: AgreeButtonProps) {
  return (
    <button
      className="w-full rounded-lg bg-green-700 hover:bg-green-800 py-2 transition-colors duration-300"
      onClick={modalCloseFunc}
    >
      <div className="flex items-center justify-center text-white">
        <IoMdCheckmarkCircleOutline size={20} className="mr-2" />
        同意する
      </div>
    </button>
  );
}
