// import { Disclaimer } from "./components/disclaimer";
// import MainCard from "./components/main-card";

import Image from "next/image";
import { Footer } from "./components/toppage/layout/footer";
import { Header } from "./components/toppage/layout/header";
import { ImageSliderArea } from "./components/toppage/layout/image-slider-area";
import { MainArea } from "./components/toppage/layout/main-area";

import EnvHubImage1 from "@/public/envhub_1.png";

// export default function Home() {
//   return (
//     <>
//       <div className="h-screen flex justify-evenly items-center">
//         <MainCard text="envを共有する" redirectTo={`${process.env.SITE_DOMAIN}/share/post`} />
//         <MainCard text="envを共有してもらう" redirectTo={`${process.env.SITE_DOMAIN}/share/get`} />
//       </div>
//       <Disclaimer />
//     </>
//   );
// }

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <MainArea />
      {/* <div className="flex-1 relative">
        <Image
          src={EnvHubImage1}
          alt="EnvHubのスクリーンショット"
          fill
          className="object-contain"
        />
      </div> */}
      <ImageSliderArea />
      <Footer />
    </div>
  );
}
