"use client";

import Modal from "react-modal";
import { MdContentCopy } from "react-icons/md";
import { useModal } from "@/app/hooks/toppage/useModal";
import { DisClaimerInModalContent } from "./inmodal/disclaimer-in-modal-content";

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

export function DisclaimerButton() {
  const { isModalOpen, modalOpen, modalClose } = useModal();

  return (
    <>
      <div
        className="bg-gray-200 hover:bg-gray-500 text-black py-2 px-10 rounded-md flex w-fit items-center text-sm transition-colors duration-300"
        onClick={modalOpen}
      >
        <MdContentCopy className="mr-2" />
        Disclaimer
      </div>
      <Modal isOpen={isModalOpen} style={modalStyle}>
        <DisClaimerInModalContent modalCloseFunc={modalClose} />
      </Modal>
    </>
  );
}
