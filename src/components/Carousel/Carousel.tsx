/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Carousel from "nuka-carousel";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

import { useWindowWidth } from "@/hooks";

import { CaroulselButton, DivCarousel } from "./styles";

export type CarouselMovieImage = { alt: string; src: string; link?: string };

export type CineCarouselProps = {
  images: CarouselMovieImage[];
  defaultNumberOfSlides?: number;
};

function numberOfSlides(windowWidth: number, defaultNumberOfSlides: number) {
  if (defaultNumberOfSlides) {
    return defaultNumberOfSlides;
  } else {
    if (windowWidth <= 768) {
      return 2;
    }
    if (windowWidth > 768 && windowWidth <= 1152) {
      return 3;
    }
    return 4;
  }
}

export const CineCarousel = ({
  images,
  defaultNumberOfSlides = 0,
}: CineCarouselProps) => {
  const { windowWidth } = useWindowWidth();

  return (
    <DivCarousel>
      <Carousel
        vertical={true}
        slidesToShow={numberOfSlides(windowWidth, defaultNumberOfSlides)}
        swiping={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <CaroulselButton
            onClick={previousSlide}
            style={{ position: "relative", left: "-20px" }}
          >
            <GrPrevious />
          </CaroulselButton>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <CaroulselButton
            onClick={nextSlide}
            style={{ position: "relative", right: "-20px" }}
          >
            <GrNext />
          </CaroulselButton>
        )}
        defaultControlsConfig={{
          pagingDotsStyle: {
            fill: "white",
          },
        }}
      >
        {images.map((image, index) =>
          image.link ? (
            <Link
              href={image.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <img src={image.src} alt={image.alt} key={index} />
            </Link>
          ) : (
            <img src={image.src} alt={image.alt} key={index} />
          )
        )}
      </Carousel>
    </DivCarousel>
  );
};
