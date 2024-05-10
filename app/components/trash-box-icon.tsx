"use client";

import Image from "next/image";
import trashBoxIcon from "@/public/trashbox-icon.svg"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface TrashBoxIconProps {
  repositoryId: string;
  fileName: string;
}

interface ResponseJson {
  isError: boolean;
  messages: string[];
}

export default function TrashBoxIcon({ repositoryId, fileName }: TrashBoxIconProps) {
  const router = useRouter();

  const handleDeleteButtonClick = async () => {
    const response = await fetch(`/files?repository_id=${repositoryId}&file_name=${fileName}`, {
      method: "DELETE"
    });

    const { isError, messages }: ResponseJson = await response.json();

    if (isError) {
      return messages.forEach(message => toast.error(message, {
        theme: "colored",
        autoClose: 2000
      }));
    }

    messages.forEach(message => toast.success(message, {
      theme: "colored",
      autoClose: 2000
    }));
    
    router.refresh();
  }

  return (
    <Image src={trashBoxIcon} onClick={() => handleDeleteButtonClick()} className="inline ml-12 cursor-pointer" alt="ファイル削除のアイコン" width={16} height={16} />
  )
}