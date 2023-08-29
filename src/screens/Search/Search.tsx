import React, { useEffect, useState } from "react";

import { ContainerPages, LoadMore, opacityAnimation } from "@/styles/globals";

import { SearchContainer } from "./styles";
import MovieData from "@/services/movieApi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Footer, Header, MovieCard } from "@/components";
import { Movie } from "@/models";

export const SearchResults = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [totalPages, setTotalPages] = useState(0);
  // the actual page always begin in 1
  const [actualPage, setActualPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // reset the states after a new search
    setActualPage(1);
    setMovies([]);
  }, [router.pathname]);

  useEffect(() => {
    // getting the search query from the location and formatting
    const query = router.query ? router.query : "";
    let isMounted = true;
    (async () => {
      await MovieData.searchMovie(query as string, actualPage).then(
        (response) => {
          if (isMounted) {
            // same logic behind the Homepage pagination
            if (actualPage === 1) {
              setTotalPages(response.total_pages);
              setMovies(response.results);
            } else {
              setMovies((oldMovies) => [...oldMovies, ...response.results]);
            }
          }
        }
      );
    })();

    return () => {
      isMounted = false;
    };
  }, [router.query, actualPage]);

  return (
    <>
      <Header />
      <ContainerPages>
        <SearchContainer>
          <h1>Search Results</h1>
          {movies.length !== 0 ? (
            <motion.div className="grid">
              {movies.map((movie, index) => {
                return (
                  <motion.div
                    variants={opacityAnimation}
                    initial="initial"
                    animate="final"
                    key={index}
                  >
                    <MovieCard
                      idMovie={movie.id}
                      poster={movie.poster_path}
                      title={movie.original_title}
                      score={movie.vote_average}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <h1>No Movies Found!</h1>
          )}
        </SearchContainer>

        {actualPage >= totalPages ? (
          ""
        ) : (
          <LoadMore onClick={() => setActualPage(actualPage + 1)}>
            Load More Search Results
          </LoadMore>
        )}
      </ContainerPages>
      <Footer />
    </>
  );
};
