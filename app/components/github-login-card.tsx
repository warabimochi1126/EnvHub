"use client";

import Image from "next/image";
import { githubSignIn } from "@/actions/auth";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

interface GithubLoginCardProps {
  redirectUrl: string
}

export default function GitHubLoginCard({ redirectUrl } : GithubLoginCardProps) {
  // クエリパラメータのredirectUrlを取得してServer Actionsに渡す
  const githubSignInWithRedirectUrl = githubSignIn.bind(null, redirectUrl);

  const [ clicked, setClicked ] = useState(false);
  
  const hadnleGitHubLogin = () => {
    setClicked(!clicked);
    githubSignInWithRedirectUrl();
  }

  if (clicked) {
    return (
    <div className="w-[234px] h-20 bg-black px-6 border-2 border-radius rounded-lg flex justify-center items-center">
      <PuffLoader color="#00CECC"/>
    </div>
    )
  }

  return (
    <button onClick={() => hadnleGitHubLogin()} className="flex border-2 border-black px-6 border-radius rounded-lg bg-black">
        <Image src="github-mark-white.svg" width={25} height={25} alt="GitHubのアイコン" className="my-6"/>
        <span className="my-6 text-white ml-2 text-lg">GitHubでログイン</span>
    </button>
  )
}