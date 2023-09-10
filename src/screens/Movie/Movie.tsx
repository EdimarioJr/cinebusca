import React, { useState, useEffect } from "react";
import { useGetMovieImagesQuery, useGetMovieQuery } from "@/services";
import { Gallery } from "./styles";
import { ContainerPages } from "@/styles/globals";
import {
  CineCarousel,
  Footer,
  Header,
  Loading,
  MovieDetail,
} from "@/components";
import { Cast } from "./Cast";
import { Recommendations } from "./Recommendations";

export type MovieProps = {
  id: number;
};

export const MovieScreen = (props: MovieProps) => {
  const [director, setDirector] = useState("");

  const [windowWidth, setWindowWidth] = useState(0);
  const idMovie = props.id;

  const { data: movie, isLoading: isLoadingMovie } = useGetMovieQuery(idMovie, {
    skip: !idMovie,
  });

  const { data: movieImages, isLoading: isLoadingMovieImages } =
    useGetMovieImagesQuery(idMovie, { skip: !idMovie });

  const formattedImages =
    movieImages?.backdrops.map((image) => ({
      src: `https://image.tmdb.org/t/p/original/${image.file_path}`,
      alt: image.file_path,
    })) ?? [];

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
        {!isLoadingMovie && !isLoadingMovieImages ? (
          movie && (
            <>
              <MovieDetail {...{ director, ...movie }} />
              <Cast putDirector={setDirector} idMovie={idMovie} />
              {windowWidth >= 768 && formattedImages.length > 0 && (
                <Gallery>
                  <CineCarousel
                    images={formattedImages}
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
