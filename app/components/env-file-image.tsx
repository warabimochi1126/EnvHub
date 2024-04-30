import fileIcon from "@/public/file-icon.svg"
import Image from "next/image"

export function EnvFileImg() {
  return (
    <div className="bg-[#EBE9E6] w-40 h-40 rounded flex justify-center items-center">
      <Image src={fileIcon} alt="ファイルアイコン" width={50} height={50} />
    </div>

  )
}