"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import { FiGithub } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { githubSignIn } from "@/actions/auth";

Modal.setAppElement(".modal");

const modalStyle = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(33,33,33,0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
    width: "400px",
  },
};

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
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);

  const [clickedButtonText, setClickedButtonText] = useState<string>();

  const bgColor =
    theme === "blue"
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : "bg-gray-200 hover:bg-gray-500 text-black";

  const handleButtonClick = async (buttonText: string) => {
    setClickedButtonText(buttonText);

    const response = await fetch("/api/auth/status-check", {
      method: "POST",
      body: href,
    });

    console.log(await response.json());

    if (!response.ok) {
      modalOpen();
    }

    setClickedButtonText(undefined);
  };

  return (
    <>
      <div
        className={`${bgColor} py-2 px-10 rounded-md flex w-fit items-center text-sm transition-colors duration-300`}
        onClick={() => handleButtonClick(text)}
      >
        <Icon size={20} className="mr-2" />
        <span className="mr-1">{text}</span>
        {clickedButtonText === text && (
          <ClipLoader size={15} color="skyblue" speedMultiplier={0.5} />
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={modalClose}
      >
        <InModalContent modalCloseFunc={modalClose} redirectUrl={href} />
      </Modal>
    </>
  );
}

interface InModalContentProps {
  modalCloseFunc: () => void;
  redirectUrl: string;
}

export function InModalContent({
  modalCloseFunc,
  redirectUrl,
}: InModalContentProps) {
  // TODO:ログインボタン押下時にログイン処理を走らせる
  // 元々のログイン機能を探る必要がありそう
  const githubSignInWithRedirectUrl = githubSignIn.bind(null, redirectUrl);

  const [isLoginButtonClicked, setIsLoginButtonClicked] =
    useState<boolean>(false);

  const handleGithubLoginButton = async () => {
    setIsLoginButtonClicked(true);
    githubSignInWithRedirectUrl();
  };

  return (
    <>
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
      <div>
        <div className="text-gray-500 mt-2">
          <p>EnvHubの利用にはGitHubアカウントでのログインが必要です。</p>
        </div>
      </div>
      <hr className="h-2 mt-2" />
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
    </>
  );
}
