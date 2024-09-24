"use client";

import { BsCheck2Circle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { BsExclamationTriangle } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

interface UploadResultModalContentProps {
  result: "SUCCESS" | "FAIL";
}

export function UploadResultModalContent({ result }: UploadResultModalContentProps) {
  return (
    <div>
      <h1 className="font-bold text-lg">アップロード結果</h1>
      <div className="flex flex-col justify-center items-center">
        {/* <BsCheck2Circle size={100} color="10B981" /> */}
        {/* <p className="text-gray-600">アップロードが完了しました！</p> */}
        <MdError size={100} className="text-red-500" />
        <p className="text-red-400">アップロードに失敗しました。</p>
      </div>
      <hr className="mt-2 h-2" />
      {/* <button className="w-full border rounded-lg py-2 flex items-center justify-center text-white bg-green-600 hover:bg-green-500 transition-colors duration-300">
        アップロードを確認する
        <FaArrowRight className="ml-2" />
      </button> */}
      <button className="w-full border rounded-lg py-2 flex items-center justify-center text-white bg-red-500 hover:bg-red-400 transition-colors duration-300">
        <FiRefreshCw className="mr-2" />
        再アップロードを行う
      </button>
    </div>
  );
}
