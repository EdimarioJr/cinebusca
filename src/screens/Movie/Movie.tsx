import React from "react";

import { CineCarousel } from "@/components";
import { useMovieDetail, useWindowWidth } from "@/hooks";
import { MainLayout } from "@/layouts";

import { Cast, MovieDetail, Recommendations } from "./components";
import { Gallery } from "./styles";

import { CastPerson, Crew, Movie, MovieDetails } from "@/models";
import { MovieImagesResponse } from "@/store/queries";

export type MovieScreenProps = {
  movie: MovieDetails;
  movieCast: {
    cast: CastPerson[];
    crew: Crew[];
  };
  recommendations: Movie[];
  images: MovieImagesResponse;
};

const SCREEN_MIN_GALLERY = 768;

export const MovieScreen = ({
  movie,
  movieCast,
  recommendations,
  images,
}: MovieScreenProps) => {
  const { windowWidth } = useWindowWidth();

  const { director, formattedImages, cast } = useMovieDetail({
    images,
    movieCast,
  });

  return (
    <MainLayout>
      <MovieDetail {...{ director, ...movie }} />

      <Cast cast={cast} />
      {windowWidth >= SCREEN_MIN_GALLERY && formattedImages.length > 0 && (
        <Gallery>
          <CineCarousel images={formattedImages} defaultNumberOfSlides={1} />
        </Gallery>
      )}

      <Recommendations
        recommendations={recommendations ?? []}
        movieTitle={movie.original_title}
      />
    </MainLayout>
  );
};
