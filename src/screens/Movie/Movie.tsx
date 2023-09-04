import React, { useState, useEffect } from "react";
import MovieData from "@/services/movieApi";
import { Gallery } from "./styles";
import { ContainerPages } from "@/styles/globals";
import {
  CarouselMovieImage,
  CineCarousel,
  Footer,
  Header,
  Loading,
  MovieDetail,
} from "@/components";
import { Cast } from "./Cast";
import { Recommendations } from "./Recommendations";
import { MovieDetails } from "@/models";

export type MovieProps = {
  id: number;
};

export const MovieScreen = (props: MovieProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [movieImages, setMovieImages] = useState([] as CarouselMovieImage[]);
  const [director, setDirector] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const idMovie = props.id;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [movie, images] = await Promise.all([
          MovieData.getMovie(idMovie),
          MovieData.getMovieImages(idMovie),
        ]);
        setMovie(movie);
        const formattedImages: CarouselMovieImage[] = images.backdrops.map(
          (image) => ({
            src: `https://image.tmdb.org/t/p/original/${image.file_path}`,
            alt: image.file_path,
          })
        );
        setMovieImages(formattedImages);
      } catch {
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [idMovie]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      window.scrollTo({ top: 0, behavior: "smooth" });

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [idMovie, setWindowWidth]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  return (
    <>
      <Header />
      <ContainerPages>
        {!isLoading ? (
          movie && (
            <>
              <MovieDetail {...{ director, ...movie }} />
              <Cast putDirector={setDirector} idMovie={idMovie} />
              {windowWidth >= 768 && movieImages.length > 0 && (
                <Gallery>
                  <CineCarousel
                    images={movieImages}
                    defaultNumberOfSlides={1}
                  />
                </Gallery>
              )}

              <Recommendations
                idMovie={idMovie}
                movieTitle={movie.original_title}
              />
            </>
          )
        ) : (
          <Loading />
        )}
      </ContainerPages>
      <Footer />
    </>
  );
};
