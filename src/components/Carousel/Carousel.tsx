import React, { useState, useEffect } from "react";
import { DivCarousel } from "./styles";
import Carousel from "nuka-carousel";
import Link from "next/link";
import MovieData from "../../services/movieApi";
import { Loading } from "..";
import { Movie, MovieImage } from "@/models";

export type CineCarouselProps = {
  idMovie?: string;
};

export const CineCarousel = ({ idMovie = "" }: CineCarouselProps) => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movieImages, setMovieImages] = useState([] as MovieImage[]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    let isMounted = true;

    window.addEventListener("resize", handleResize);
    setIsLoading(true);
    async function fetchData() {
      idMovie && isMounted
        ? await MovieData.getMovieImages(idMovie).then((response) => {
            setMovieImages(response.backdrops);
            setIsLoading(false);
          })
        : await MovieData.getPopularMovies().then((response) => {
            setMovies(response);
            setIsLoading(false);
          });
    }
    fetchData();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [idMovie]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  function numberOfSlides() {
    if (idMovie) {
      return 1;
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

  return (
    <>
      <DivCarousel>
        {isLoading ? (
          <Loading />
        ) : (
          <Carousel
            slidesToShow={numberOfSlides()}
            swiping={true}
            defaultControlsConfig={{
              pagingDotsStyle: {
                fill: "white",
              },
            }}
          >
            {idMovie
              ? movieImages.map((movie, index) => {
                  return (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.file_path}`}
                      alt={"gallery"}
                      key={index}
                    />
                  );
                })
              : movies.map((movie, index) => {
                  return (
                    <Link
                      href={`/Movie/${movie.id}`}
                      key={index}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${
                          movie.poster_path
                            ? movie.poster_path
                            : movie.backdrop_path
                        }`}
                        alt={movie.original_title}
                      />
                    </Link>
                  );
                })}
          </Carousel>
        )}
      </DivCarousel>
    </>
  );
};
