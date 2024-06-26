import { Disclaimer } from "./components/disclaimer";
import MainCard from "./components/main-card";

export default function Home() {
  return (
    <>
      <div className="h-screen flex justify-evenly items-center">
        <MainCard text="envを共有する" redirectTo={`${process.env.SITE_DOMAIN}/share/post`} />
        <MainCard text="envを共有してもらう" redirectTo={`${process.env.SITE_DOMAIN}/share/get`} />
      </div>
      <Disclaimer />
    </>
  );
}