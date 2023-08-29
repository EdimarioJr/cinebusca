import React, { useEffect, useState } from "react";
import { Main } from "./styles";
import { Container, opacityAnimation, LoadMore } from "@/styles/globals";
import MovieData from "@/services/movieApi";

import { motion } from "framer-motion";
import { CineCarousel, Footer, Header, MovieCard } from "@/components";
import { Movie } from "@/models";

export function Homepage() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    // begins in page 2 because the carousel queries the page 1 of popular movies
    (async () => {
      await MovieData.getPopularMovies(page).then((response) => {
        if (page === 2) setMovies(response);
        // if page> 2, the movies will be pushed to the movies state, instead of be replaced after each query
        else {
          setMovies((oldMovies) => [...oldMovies, ...response]);
        }
      });
    })();
  }, [page]);

  return (
    <>
      <Header />
      <motion.div animate="final" initial="initial" variants={opacityAnimation}>
        <CineCarousel />
      </motion.div>
      <Container>
        <Main>
          <h1>Popular Movies</h1>
          <section className="grid-movies">
            {movies.map((movie, index) => {
              return (
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
              );
            })}
          </section>
          <LoadMore
            onClick={() => {
              let newPage = page + 1;
              setPage(newPage);
            }}
          >
            LOAD MORE!
          </LoadMore>
        </Main>
      </Container>
      <Footer />
    </>
  );
}
