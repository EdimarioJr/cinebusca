/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { DivCarousel } from "./styles";
import Carousel from "nuka-carousel";
import Link from "next/link";

export type CarouselMovieImage = { alt: string; src: string; link?: string };

export type CineCarouselProps = {
  images: CarouselMovieImage[];
  defaultNumberOfSlides?: number;
};

export const CineCarousel = ({
  images,
  defaultNumberOfSlides = 0,
}: CineCarouselProps) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    let isMounted = true;

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  function numberOfSlides() {
    if (defaultNumberOfSlides) {
      return defaultNumberOfSlides;
    } else {
      if (windowWidth <= 768) {
        return 3;
      }
      if (windowWidth > 768 && windowWidth <= 1152) {
        return 4;
      }
      return 5;
    }
  }

  return (
    <DivCarousel>
      <Carousel
        vertical={true}
        slidesToShow={numberOfSlides()}
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
