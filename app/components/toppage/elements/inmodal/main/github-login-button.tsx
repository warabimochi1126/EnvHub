import { githubSignIn } from "@/actions/auth";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { ClipLoader } from "react-spinners";

interface GitHubLoginButtonProps {
  redirectUrl: string;
}

export function GitHubLoginButton({ redirectUrl }: GitHubLoginButtonProps) {
  const githubSignInWithRedirectUrl = githubSignIn.bind(null, redirectUrl);

  const [isLoginButtonClicked, setIsLoginButtonClicked] =
    useState<boolean>(false);

  const handleGithubLoginButton = async () => {
    setIsLoginButtonClicked(true);
    githubSignInWithRedirectUrl();
  };

  return (
    <button
      className="w-full mt-1 flex justify-center items-center bg-gray-900 rounded-lg text-white py-2 transition-colors duration-300 hover:bg-gray-800 hover:shadow-md"
      onClick={() => handleGithubLoginButton()}
    >
      <IoLogoGithub className="mr-2" size={20} />
      <span className="mr-1">GitHubでログイン</span>
      {isLoginButtonClicked && (
        <ClipLoader size={16} color="white" speedMultiplier={0.5} />
      )}
    </button>
  );
}
