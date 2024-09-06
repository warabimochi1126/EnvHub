import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | EnvHub",
    default: "home | EnvHub"
  } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <Link href="/">
        <Image src="/top-icon.png" alt="アイコン" width={50} height={50} className="absolute top-5 left-5" />
      </Link> */}
      {children}
      </body>
    </html>
  );
}
