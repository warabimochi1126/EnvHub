import Image from "next/image";
import { githubSignIn } from "@/actions/auth";

interface GithubLoginCardProps {
  redirectUrl: string
}

export default function GitHubLoginCard({ redirectUrl } : GithubLoginCardProps) {
  // クエリパラメータのredirectUrlを取得してServer Actionsに渡す
  const githubSignInWithRedirectUrl = githubSignIn.bind(null, redirectUrl);

  return (
    <form action={githubSignInWithRedirectUrl}>
      <button className="flex border-2 border-black px-6 border-radius rounded-lg bg-black">
        <Image src="github-mark-white.svg" width={25} height={25} alt="GitHubのアイコン" className="my-6"/>
        <span className="my-6 text-white ml-2 text-lg">GitHubでログイン</span>
      </button>
    </form>
  )
}