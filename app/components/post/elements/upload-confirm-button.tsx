"use client";

import { useModal } from "@/app/hooks/toppage/useModal";
import Modal from "react-modal";
import { UploadModalHeader } from "./inmodal/upload-modal-header";
import { UploadModalContent } from "./inmodal/upload-modal-content";
import { UploadModalFooter } from "./inmodal/upload-modal-footer-button";
import { UploadModalCommitMessage } from "./inmodal/upload-modal-commit-message";
import { useState } from "react";

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
    width: "500px",
  },
};

interface UploadConfirmButtonProps {
  uploadFiles: File[];
  isButtonEnabled: boolean;
}

export function UploadConfirmButton({ uploadFiles, isButtonEnabled }: UploadConfirmButtonProps) {
  const { isModalOpen, modalOpen, modalClose } = useModal();
  const [commitMessage, setCommitMessage] = useState<string>("");

  return (
    <>
      <button
        className={`bg-gray-800 text-white rounded-md w-full py-3 text-sm hover:bg-gray-700 transition-colors duration-300 ${
          !isButtonEnabled && "hover:cursor-not-allowed"
        }`}
        onClick={isButtonEnabled ? modalOpen : undefined}
      >
        アップロードを確定する
      </button>
      <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={modalClose}>
        <UploadModalHeader modalClose={modalClose} />
        <UploadModalContent uploadFiles={uploadFiles} />
        <hr className="mt-2 h-2" />
        {/* <div className="mt-1">
          <div className="flex items-center">
            <IoAlertCircleOutline className="mr-1" />
            <p className="text-sm">以下の入力欄でコミットメッセージを決められます。</p>
          </div>
          <input
            placeholder="コミットメッセージを入力してください"
            className="w-full rounded border p-1 mt-1"
          />
        </div> */}
        <UploadModalCommitMessage setCommitMessage={setCommitMessage} />
        <UploadModalFooter modalClose={modalClose} uploadFiles={uploadFiles} commitMessage={commitMessage} />
      </Modal>
    </>
  );
}
