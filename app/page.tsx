import { Footer } from "./components/toppage/layout/footer";
import { Header } from "./components/toppage/layout/header";
import { ImageSliderArea } from "./components/toppage/layout/image-slider-area";
import { MainArea } from "./components/toppage/layout/main-area";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <MainArea />
      <ImageSliderArea />
      <Footer />
    </div>
  );
}
