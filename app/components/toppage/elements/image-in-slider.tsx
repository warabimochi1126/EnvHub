import Image, { StaticImageData } from "next/image";

interface ImageInSliderProps {
  ImageSrc: StaticImageData;
}

export function ImageInSlider({ ImageSrc }: ImageInSliderProps) {
  return (
    <div className="relative h-full">
      <Image
        src={ImageSrc}
        alt="EnvHubのスクリーンショット"
        fill
        className="object-contain"
      />
    </div>
  );
}
