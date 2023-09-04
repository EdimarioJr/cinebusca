import React, { useEffect, useState } from "react";
import { Main } from "./styles";
import { Container, opacityAnimation, LoadMore } from "@/styles/globals";
import MovieData from "@/services/movieApi";

import { motion } from "framer-motion";
import {
  CarouselMovieImage,
  CineCarousel,
  Footer,
  Header,
  Loading,
  MovieCard,
} from "@/components";
import { Movie } from "@/models";

const GRID_BEGIN_PAGE = 2;

export function Homepage() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movieImages, setMovieImages] = useState([] as CarouselMovieImage[]);
  const [page, setPage] = useState(GRID_BEGIN_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await MovieData.getPopularMovies(page).then((response) => {
        setMovies((oldMovies) => [...oldMovies, ...response]);
      });
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      await MovieData.getPopularMovies().then((response) => {
        console.log("e", response);
        const formattedImages: CarouselMovieImage[] = response.map((movie) => ({
          src: `https://image.tmdb.org/t/p/w342/${
            movie.poster_path ? movie.poster_path : movie.backdrop_path
          }`,
          alt: movie.original_title,
          link: `/movie/${movie.id}`,
        }));
        setMovieImages(formattedImages);
        setIsLoading(false);
      });
    })();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <motion.div
            animate="final"
            initial="initial"
            variants={opacityAnimation}
          >
            <CineCarousel images={movieImages} />
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
        </>
      )}

      <Footer />
    </>
  );
}
