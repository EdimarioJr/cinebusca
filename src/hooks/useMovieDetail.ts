import { MovieScreenProps } from "@/screens";

export type UseMovieDetailParams = {
  images: MovieScreenProps["images"];
  movieCast: MovieScreenProps["movieCast"];
};

export const useMovieDetail = ({ images, movieCast }: UseMovieDetailParams) => {
  const formattedImages =
    images?.backdrops.map((image) => ({
      src: `https://image.tmdb.org/t/p/original/${image.file_path}`,
      alt: image.file_path,
    })) ?? [];

  const director =
    movieCast?.crew.find((current) => current.job === "Director")?.name ?? "";

  const cast = movieCast?.cast ?? [];

  return {
    cast: cast ?? [],
    director,
    formattedImages,
  };
};
