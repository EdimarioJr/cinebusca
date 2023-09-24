import React from "react";

import { CineCarousel, Loading } from "@/components";
import { useMovieDetail, useWindowWidth } from "@/hooks";
import { MainLayout } from "@/layouts";

import { Cast, MovieDetail, Recommendations } from "./components";
import { Gallery } from "./styles";

export type MovieProps = {
  id: number;
};

const SCREEN_MIN_GALLERY = 768;

export const MovieScreen = (props: MovieProps) => {
  const idMovie = props.id;

  const { windowWidth } = useWindowWidth();

  const {
    isLoadingMovie,
    isLoadingMovieImages,
    movie,
    recommendations,
    director,
    formattedImages,
    cast,
  } = useMovieDetail({ idMovie });

  return (
    <MainLayout>
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
    </MainLayout>
  );
};
