"use client";

import { useState } from "react";
import { FiGithub } from "react-icons/fi";

import Modal from "react-modal";

Modal.setAppElement(".App");

const modalStyle = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(33,33,33,0.8)",
  },
  content: {
    // top: "15rem",
    // left: "30rem",
    // right: "30rem",
    // bottom: "15rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
    width: "425px",
    height: "300px",
  },
};

export default function LoginModal() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div onClick={() => setIsOpen(true)}>モーダルを表示する</div>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <div className="flex justify-between">
          <div className="text-black text-xl font-bold">
            GitHubでログインする
          </div>
          <span className="text-3xl">×</span>
        </div>
        <p>
          EnvHubは.envファイルをGitHubリポジトリに紐づけて保存・共有するWebアプリケーションです。
        </p>
        {/* <p>従って、GitHubアカウントでのログインが必要です。</p> */}
        <button className="bg-black w-full h-20 flex justify-between">
          <FiGithub color="white" />
          <span className="text-white">GitHubでログインする</span>
        </button>
        <button className="bg-gray-300 w-full h-20 flex justify-between">
          <span className="text-white">envっぽいマーク</span>
          <span className="text-white">見るだけならこちら</span>
        </button>
      </Modal>
    </div>
  );
}
