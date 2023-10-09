import React from "react";

import { MovieScreen, MovieScreenProps } from "@/screens";
import { movieService } from "@/services";
import { GetServerSideProps } from "next";

const Movie = ({
  movie,
  images,
  recommendations,
  movieCast,
}: MovieScreenProps) => (
  <MovieScreen
    movieCast={movieCast}
    movie={movie}
    images={images}
    recommendations={recommendations}
    key={movie.id}
  />
);

export default Movie;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.params?.id ?? "";

    if (!id) throw new Error("Error on movie params");

    const numberId = Number(id);

    const [
      movieResponse,
      movieCastResponse,
      movieRecommendationsResponse,
      movieImagesResponse,
    ] = await Promise.allSettled([
      movieService.getMovie(numberId),
      movieService.getMovieCast(numberId),
      movieService.getMovieRecommendations(numberId),
      movieService.getMovieImages(numberId),
    ]);

    if (movieResponse.status === "rejected")
      throw new Error("Error fetching the movie!");

    return {
      props: {
        movie: movieResponse.value,
        movieCast:
          movieCastResponse.status === "fulfilled"
            ? movieCastResponse.value
            : [],
        recommendations:
          movieRecommendationsResponse.status === "fulfilled"
            ? movieRecommendationsResponse.value
            : [],
        images:
          movieImagesResponse.status === "fulfilled"
            ? movieImagesResponse.value
            : [],
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
