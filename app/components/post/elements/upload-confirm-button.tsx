"use client";

import { useModal } from "@/app/hooks/toppage/useModal";
import Modal from "react-modal";
import { UploadModalHeader } from "./inmodal/upload-modal-header";
import { UploadModalContent } from "./inmodal/upload-modal-content";
import { UploadModalFooterButton } from "./inmodal/upload-modal-footer-button";
import { UploadModalCommitMessage } from "./inmodal/upload-modal-commit-message";
import { useState } from "react";

import { PulseLoader } from "react-spinners";
import { BsCheck2Circle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { UploadResultModalContent } from "./inmodal/result/upload-result-modal-content";
import { UploadDuringModalContent } from "./inmodal/during/upload-during-modal-content";

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

export type CommitState = "BEFORE" | "DURING" | "SUCCESS" | "FAIL";

export function UploadConfirmButton({ uploadFiles, isButtonEnabled }: UploadConfirmButtonProps) {
  const { isModalOpen, modalOpen, modalClose } = useModal();
  const [commitMessage, setCommitMessage] = useState<string>("");
  const [commitState, setCommitState] = useState<CommitState>("BEFORE");

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
        <UploadResultModalContent />
        {/* <UploadDuringModalContent /> */}
        {/* <UploadModalHeader modalClose={modalClose} />
        <UploadModalContent uploadFiles={uploadFiles} />
        <hr className="mt-2 h-2" />
        <UploadModalCommitMessage setCommitMessage={setCommitMessage} />
        <UploadModalFooterButton
          modalClose={modalClose}
          uploadFiles={uploadFiles}
          commitMessage={commitMessage}
          setCommitState={setCommitState}
        /> */}
      </Modal>
    </>
  );
}
