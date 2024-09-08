"use client";

import { useState } from "react";
import Modal from "react-modal";
import { MdContentCopy } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);

  return (
    <>
      <div
        className="bg-gray-200 hover:bg-gray-500 text-black py-2 px-10 rounded-md flex w-fit items-center text-sm"
        onClick={modalOpen}
      >
        <MdContentCopy className="mr-2" />
        Disclaimer
      </div>
      <Modal isOpen={modalIsOpen} style={modalStyle}>
        <InModalContent modalCloseFunc={modalClose} />
      </Modal>
    </>
  );
}

// TODO:下のコンポーネントをファイルで分けるかどうか迷っている
// 分けるメリット:1ファイル1コンポーネントが守られていて、心理的に見やすい
// 分けるデメリット:elementsの中にlayoutから直接参照されていないファイルが出来てしまう、ディレクトリ構造としてはパッと見で分かりずらい

interface InModalContent {
  modalCloseFunc: () => void;
}

export function InModalContent({ modalCloseFunc }: InModalContent) {
  return (
    <>
      <p className="font-bold text-lg">免責事項</p>
      <p className="text-gray-600 mt-2">
        このウェブアプリを利用することによって生じるあらゆる損害や損失に対して、一切の責任を負いません
      </p>
      <hr className="mt-2 h-2 mb-1" />
      <button
        className="w-full rounded-lg bg-green-700 hover:bg-green-800 py-2 transition-colors duration-300"
        onClick={modalCloseFunc}
      >
        <div className="flex items-center justify-center text-white">
          <IoMdCheckmarkCircleOutline size={20} className="mr-2" />
          同意する
        </div>
      </button>
    </>
  );
}
