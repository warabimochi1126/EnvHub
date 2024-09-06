import Link from "next/link";
import { IconType } from "react-icons";

interface MainAreaButtonProps {
  href: string;
  theme: "blue" | "gray";
  Icon: IconType;
  text: string;
}

export function MainAreaButton({
  href,
  theme,
  Icon,
  text,
}: MainAreaButtonProps) {
  const bgColor =
    theme === "blue"
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : "bg-gray-200 hover:bg-gray-500 text-black";

  return (
    <Link
      href={href}
      className={`${bgColor} py-2 px-10 rounded-md flex w-fit items-center text-sm`}
    >
      <Icon size={20} className="mr-2" />
      {text}
    </Link>
  );
}
