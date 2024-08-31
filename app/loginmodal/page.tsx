"use client";

import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";

import Modal from "react-modal";

Modal.setAppElement(".App");

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
    // height: "200px",
  },
};

export default function LoginModal() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div onClick={() => setIsOpen(true)}>モーダルを表示する</div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={() => setIsOpen(false)}
        closeTimeoutMS={100}
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <FiGithub size={22} className="mr-1" />
            <span className="text-lg font-bold">GitHub Login</span>
          </div>
          <IoMdClose
            size={34}
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-full hover:bg-gray-200 p-1.5 transition-colors duration-200"
          />
        </div>
        <div>
          <div className="text-gray-500 text-sm">
            <p>EnvHubの利用にはGitHubアカウントでのログインが必要です。</p>
          </div>
        </div>
        <button className="w-full mt-3 flex justify-center items-center bg-gray-900 rounded text-white py-2 transition duration-200 ease-in-out hover:bg-gray-800 hover:shadow-md">
          <IoLogoGithub className="mr-2" size={20} />
          <span>GitHubでログイン</span>
        </button>
      </Modal>
    </div>
  );
}
