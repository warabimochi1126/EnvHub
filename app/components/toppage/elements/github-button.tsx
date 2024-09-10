import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export function GitHubButton() {
  return (
    <Link
      href={process.env.GITHUB_URL!}
      className="flex w-fit items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
    >
      <FiGithub className="mr-2" size={18} />
      <span className="text-sm">GitHub</span>
    </Link>
  );
}
