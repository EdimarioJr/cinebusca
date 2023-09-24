import {
  useGetMovieCastQuery,
  useGetMovieImagesQuery,
  useGetMovieQuery,
  useGetMovieRecommendationsQuery,
} from "@/services";

export type UseMovieDetailParams = {
  idMovie: number;
};

export const useMovieDetail = ({ idMovie }: UseMovieDetailParams) => {
  const { data: movieCast } = useGetMovieCastQuery(idMovie);

  const { data: movie, isLoading: isLoadingMovie } = useGetMovieQuery(idMovie, {
    skip: !idMovie,
  });

  const { data: recommendations } = useGetMovieRecommendationsQuery(idMovie, {
    skip: !idMovie,
  });

  const { data: movieImages, isLoading: isLoadingMovieImages } =
    useGetMovieImagesQuery(idMovie, { skip: !idMovie });

  const formattedImages =
    movieImages?.backdrops.map((image) => ({
      src: `https://image.tmdb.org/t/p/original/${image.file_path}`,
      alt: image.file_path,
    })) ?? [];

  const director =
    movieCast?.crew.find((current) => current.job === "Director")?.name ?? "";

  const cast = movieCast?.cast ?? [];

  return {
    cast,
    director,
    formattedImages,
    recommendations,
    movie,
    isLoadingMovie,
    isLoadingMovieImages,
  };
};
