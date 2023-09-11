import React, { useState, useEffect } from "react";
import {
  useGetMovieCastQuery,
  useGetMovieImagesQuery,
  useGetMovieQuery,
  useGetMovieRecommendationsQuery,
} from "@/services";
import { Gallery } from "./styles";
import { ContainerPages } from "@/styles/globals";
import { CineCarousel, Footer, Header, Loading } from "@/components";
import { Cast, MovieDetail, Recommendations } from "./components";

export type MovieProps = {
  id: number;
};

const SCREEN_MIN_GALLERY = 768;

export const MovieScreen = (props: MovieProps) => {
  const idMovie = props.id;
  const { data } = useGetMovieCastQuery(idMovie);

  const [windowWidth, setWindowWidth] = useState(0);

  const { data: movie, isLoading: isLoadingMovie } = useGetMovieQuery(idMovie, {
    skip: !idMovie,
  });

  const { data: recommendations } = useGetMovieRecommendationsQuery(idMovie);

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

  const director =
    data?.crew.find((current) => {
      return current.job === "Director";
    })?.name ?? "";

  const cast = data?.cast ?? [];

  return (
    <>
      <Header />
      <ContainerPages>
        {!isLoadingMovie && !isLoadingMovieImages ? (
          movie && (
            <>
              <MovieDetail {...{ director, ...movie }} />
              <Cast cast={cast} />
              {windowWidth >= SCREEN_MIN_GALLERY &&
                formattedImages.length > 0 && (
                  <Gallery>
                    <CineCarousel
                      images={formattedImages}
                      defaultNumberOfSlides={1}
                    />
                  </Gallery>
                )}

              <Recommendations
                recommendations={recommendations ?? []}
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
