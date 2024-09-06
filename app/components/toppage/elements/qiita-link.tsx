"use client";

import { FaExternalLinkAlt } from "react-icons/fa";
import QiitaIcon from "@/public/qiita-icon.png";
import Image from "next/image";
import { useState } from "react";

export function QiitaLink() {
  const [isHover, setIsHover] = useState<boolean>();

  return (
    <div
      className="flex items-center hover:cursor-pointer hover:text-green-600"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className="mr-1 text-base">Qiita</span>
      {isHover ? (
        <Image src={QiitaIcon} alt="Qiitaアイコン" className="w-4 h-4" />
      ) : (
        <FaExternalLinkAlt size={16} />
      )}
    </div>
  );
}
