import Link from "next/link";
import QiitaIcon from "@/public/qiita-icon.png";
import Image from "next/image";

export function QiitaButton() {
  return (
    <Link href="#" className="flex items-center">
      <Image
        src={QiitaIcon}
        alt="Qiitaアイコン"
        width={20}
        height={20}
        className="mr-1"
      />
      <span>Qiita</span>
    </Link>
  );
}
