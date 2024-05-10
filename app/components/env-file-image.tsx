"use client";

import Image from "next/image"

import fileIcon from "@/public/file-icon.svg"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface EnvFileImgProps {
  repositoryId: string;
  fileName: string;
}

interface ResponseJson {
  isError: boolean;
  messages: string[];
}

export function EnvFileImg({ repositoryId, fileName }: EnvFileImgProps) {
  const router = useRouter();

  const fileDownload = async () => {
    toast.info("ダウンロード処理を実行中です。", {
      theme: "colored",
      autoClose: 2000
    });

    const response = await fetch(`/files?repository_id=${repositoryId}&file_name=${fileName}`);

    if (response.redirected) {
      toast.success("ダウンロードが完了しました。", {
        theme: "colored",
        autoClose: 2000
      });
      router.push(response.url);
    } else {
      const { messages }: ResponseJson = await response.json();
      messages.forEach(message => toast.error(message, {
        theme: "colored",
        autoClose: 2000
      }));
    }
  }

  return (
      <div className="relative group">
        <div className="bg-[#EBE9E6] w-40 h-40 rounded flex justify-center items-center">
          <Image src={fileIcon} alt="ファイルアイコン" width={50} height={50} />
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gray-600 rounded flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="text-white font-bold" onClick={() => fileDownload()}>ダウンロードする</button>
        </div>
      </div>
  )
}