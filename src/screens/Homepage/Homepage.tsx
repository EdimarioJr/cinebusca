import { motion } from "framer-motion";
import React, { useState } from "react";

import { CineCarousel, Loading, MovieCard, Spinner } from "@/components";
import { MainLayout } from "@/layouts";
import { Movie } from "@/models";
import {
  useGetPopularMovieImagesQuery,
  useLazyGetPopularMoviesQuery,
} from "@/store/queries";
import { opacityAnimation, LoadMore } from "@/styles/globals";

import { Main } from "./styles";
import { toast } from "react-toastify";

export type HomepageProps = {
  initialMovies: Movie[];
  initialPage: number;
};

export function Homepage({ initialMovies, initialPage }: HomepageProps) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);

  const [getPopularMovies, { isLoading: isLoadingMovies }] =
    useLazyGetPopularMoviesQuery();

  const { data: movieImages, isLoading: isLoadingMovieImages } =
    useGetPopularMovieImagesQuery();

  const handleMoreMovies = async () => {
    const newPage = page + 1;
    setPage(newPage);
    try {
      const movies = await getPopularMovies(newPage).unwrap();
      setMovies((oldMovies) => [...oldMovies, ...movies]);
    } catch {
      toast.error("Erro puxando os filmes. Tente novamente mais tarde");
    }
  };

  return (
    <MainLayout>
      {isLoadingMovieImages ? (
        <Loading />
      ) : (
        <>
          <motion.div
            animate="final"
            initial="initial"
            variants={opacityAnimation}
          >
            <CineCarousel images={movieImages ?? []} />
          </motion.div>

          <Main>
            <h1>Popular Movies</h1>
            <section className="grid-movies">
              {movies.map((movie, index) => (
                <motion.div
                  animate="final"
                  initial="initial"
                  variants={opacityAnimation}
                  key={index}
                >
                  <MovieCard
                    idMovie={movie.id}
                    title={movie.original_title}
                    score={movie.vote_average}
                    poster={movie.poster_path}
                  />
                </motion.div>
              ))}
            </section>
            <LoadMore onClick={handleMoreMovies}>
              {isLoadingMovies ? <Spinner /> : "Load more!"}
            </LoadMore>
          </Main>
        </>
      )}
    </MainLayout>
  );
}
