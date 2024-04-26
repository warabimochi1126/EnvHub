import Link from "next/link";
import MainCard from "./components/main-card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <Link href="/">
        <Image src="/top-icon.png" alt="アイコン" width={50} height={50} className="absolute top-5 left-5" />
      </Link> */}
      <div className="h-screen flex justify-evenly items-center">
        <MainCard text="envを共有する" redirectTo={`${process.env.SITE_DOMAIN}/share/get`} />
        <MainCard text="envを共有してもらう" redirectTo={`${process.env.SITE_DOMAIN}/share/post`} />
      </div>
    </>
  );
}