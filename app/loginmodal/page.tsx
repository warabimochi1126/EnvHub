"use client";

import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

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
    height: "200px",
  },
};

export default function LoginModal() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div onClick={() => setIsOpen(true)}>モーダルを表示する</div>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="flex justify-between">
          <div className="flex">
            <FiGithub size={22} className="mr-2" />
            <span className="font-bold">GitHub Login</span>
          </div>
          <IoMdClose size={22} />
        </div>
        <button className="w-full mt-3 flex justify-center items-center">
          <FiGithub className="mr-1" />
          GitHubでログイン
        </button>
      </Modal>
    </div>
  );
}
