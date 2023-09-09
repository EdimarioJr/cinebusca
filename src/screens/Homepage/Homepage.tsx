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
  Spinner,
} from "@/components";
import { Movie } from "@/models";
import { toast } from "react-toastify";

const GRID_BEGIN_PAGE = 2;

export function Homepage() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movieImages, setMovieImages] = useState([] as CarouselMovieImage[]);
  const [page, setPage] = useState(GRID_BEGIN_PAGE);
  const [isLoadingMovieImages, setIsLoadingMovieImages] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingMovies(true);
        const response = await MovieData.getPopularMovies(page);
        setMovies((oldMovies) => {
          return [...oldMovies, ...response];
        });
        setIsLoadingMovies(false);
      } catch {
        toast.error("Error loading the movies");
        setIsLoadingMovies(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingMovieImages(true);
        const response = await MovieData.getPopularMovies();
        const formattedImages: CarouselMovieImage[] = response.map((movie) => ({
          src: `https://image.tmdb.org/t/p/w342/${
            movie.poster_path ? movie.poster_path : movie.backdrop_path
          }`,
          alt: movie.original_title,
          link: `/movie/${movie.id}`,
        }));
        setMovieImages(formattedImages);
        setIsLoadingMovieImages(false);
      } catch (err) {
        toast.error("Error loading the movies");
        setIsLoadingMovieImages(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      {isLoadingMovieImages ? (
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
                  const newPage = page + 1;
                  setPage(newPage);
                }}
              >
                {isLoadingMovies ? <Spinner /> : "Load more!"}
              </LoadMore>
            </Main>
          </Container>
        </>
      )}

      <Footer />
    </>
  );
}
