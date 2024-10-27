"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { useModal } from "@/app/hooks/toppage/useModal";
import { MainInModalContent } from "./inmodal/main-in-modal-content";
import { useRouter } from "next/navigation";

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
  redirectPath: string;
  theme: "blue" | "gray";
  Icon: IconType;
  text: string;
}

export function MainAreaButton({ redirectPath, theme, Icon, text }: MainAreaButtonProps) {
  const { isModalOpen, modalOpen, modalClose } = useModal();
  const [clickedButtonText, setClickedButtonText] = useState<string>();
  const router = useRouter();

  const bgColor =
    theme === "blue"
      ? "bg-blue-600 hover:bg-blue-500 text-white"
      : "bg-gray-200 hover:bg-gray-500 text-black";

  const handleButtonClick = async (buttonText: string) => {
    setClickedButtonText(buttonText);

    const response = await fetch("/api/auth/status-check", {
      method: "POST",
      body: JSON.stringify({ redirectPath }),
    });

    if (!response.ok) {
      modalOpen();
    } else {
      const { redirectUrl } = await response.json();
      router.push(redirectUrl);
    }

    setClickedButtonText(undefined);
  };

  return (
    <>
      <div
        className={`${bgColor} py-2 px-10 rounded-md flex w-fit items-center text-sm`}
        onClick={() => handleButtonClick(text)}
      >
        <Icon size={20} className="mr-2" />
        <span className="mr-1">{text}</span>
        {clickedButtonText === text && <ClipLoader size={15} color="skyblue" speedMultiplier={0.5} />}
      </div>
      <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={modalClose}>
        <MainInModalContent modalCloseFunc={modalClose} redirectPath={redirectPath} />
      </Modal>
    </>
  );
}
