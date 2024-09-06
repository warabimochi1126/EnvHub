"use client";

import Image, { StaticImageData } from "next/image";
import { Splide, SplideSlide, SplideTrack } from "react-splide-ts";

import EnvHubImage1 from "@/public/envhub_1.png";
import EnvHubImage2 from "@/public/envhub_2.png";

import "react-splide-ts/css/sea-green";

const splideOptions = {
  type: "loop",
  arrows: false,
  autoplay: true,
  rewind: true,
  speed: 1000,
  interval: 2000,
};

export function ImageSliderArea() {
  return (
    <div className="flex-1">
      <Splide className="h-full py-14" hasTrack={false} options={splideOptions}>
        <SplideTrack className="h-full">
          <SplideSlide>
            <ImageInSlider ImageSrc={EnvHubImage1} />
          </SplideSlide>
          <SplideSlide>
            <ImageInSlider ImageSrc={EnvHubImage2} />
          </SplideSlide>
        </SplideTrack>
        <div className="splide__progress">
          <div className="splide__progress__bar"></div>
        </div>
      </Splide>
    </div>
  );
}

interface ImageInSliderProps {
  ImageSrc: StaticImageData;
}

function ImageInSlider({ ImageSrc }: ImageInSliderProps) {
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
