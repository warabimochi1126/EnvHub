import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { FiGithub } from "react-icons/fi";

export function GitHubButton() {
  return (
    <Link href="#" className="flex items-center hover:text-gray-900">
      {/* <IoLogoGithub size={20} className="mr-2" /> */}
      <FiGithub size={20} className="mr-2" />
      <span>GitHub</span>
    </Link>
  );
}
