"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import QiitaIcon from "@/public/qiita-icon.png";

export function QiitaLink() {
  const [isHover, setIsHover] = useState<boolean>();

  return (
    <Link
      className="flex items-center hover:cursor-pointer hover:text-green-600"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      href={process.env.NEXT_PUBLIC_QIITA_URL!}
    >
      <span className="mr-1 text-base">Qiita</span>
      {isHover ? (
        <Image src={QiitaIcon} alt="Qiitaアイコン" className="w-4 h-4" />
      ) : (
        <FaExternalLinkAlt size={16} />
      )}
    </Link>
  );
}
