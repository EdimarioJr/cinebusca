import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { CineCarousel, Loading, MovieCard, Spinner } from "@/components";
import { MainLayout } from "@/layouts";
import { Movie } from "@/models";
import {
  useGetPopularMovieImagesQuery,
  useGetPopularMoviesQuery,
} from "@/services";
import { opacityAnimation, LoadMore } from "@/styles/globals";

import { Main } from "./styles";

const GRID_BEGIN_PAGE = 2;

export function Homepage() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [page, setPage] = useState(GRID_BEGIN_PAGE);

  const { data: moviesFromApi, isLoading: isLoadingMovies } =
    useGetPopularMoviesQuery(page);

  const { data: movieImages, isLoading: isLoadingMovieImages } =
    useGetPopularMovieImagesQuery();

  useEffect(() => {
    if (moviesFromApi?.length) setMovies((old) => [...old, ...moviesFromApi]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(moviesFromApi)]);

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
            <LoadMore
              onClick={() => {
                const newPage = page + 1;
                setPage(newPage);
              }}
            >
              {isLoadingMovies ? <Spinner /> : "Load more!"}
            </LoadMore>
          </Main>
        </>
      )}
    </MainLayout>
  );
}
