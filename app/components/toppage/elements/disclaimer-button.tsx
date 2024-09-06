import { MdContentCopy } from "react-icons/md";

export function DisclaimerButton() {
  return (
    <div className="bg-gray-200 hover:bg-gray-500 text-black py-2 px-10 rounded-md flex w-fit items-center text-sm">
      <MdContentCopy className="mr-2" />
      Disclaimer
    </div>
  );
}
