/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { DivCarousel } from "./styles";
import Carousel from "nuka-carousel";
import Link from "next/link";
import { useWindowWidth } from "@/hooks";

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
        defaultControlsConfig={{
          pagingDotsStyle: {
            fill: "white",
          },
        }}
      >
        {images.map((image, index) => {
          return image.link ? (
            <Link
              href={image.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <img src={image.src} alt={image.alt} key={index} />
            </Link>
          ) : (
            <img src={image.src} alt={image.alt} key={index} />
          );
        })}
      </Carousel>
    </DivCarousel>
  );
};
