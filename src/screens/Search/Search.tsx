import React, { useEffect, useState } from "react";

import { ContainerPages, LoadMore, opacityAnimation } from "@/styles/globals";

import { SearchContainer } from "./styles";
import { useLazySearchMovieQuery } from "@/services";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Footer, Header, MovieCard } from "@/components";
import { Movie } from "@/models";

export const SearchResultsScreen = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [totalPages, setTotalPages] = useState(0);

  const [actualPage, setActualPage] = useState(1);
  const router = useRouter();

  const [trigger] = useLazySearchMovieQuery();

  useEffect(() => {
    console.log("ai");
    setActualPage(1);
  }, [router.query.search]);

  useEffect(() => {
    const getSearchedMovies = async () => {
      const response = await trigger({
        query: (router.query?.search as string) ?? "",
        page: actualPage,
      });

      if (response.data) {
        if (actualPage === 1) {
          setTotalPages(response.data.total_pages);
          setMovies(response.data.results);
        } else {
          setMovies((oldMovies) => [
            ...oldMovies,
            ...(response?.data?.results ?? []),
          ]);
        }
      }
    };

    getSearchedMovies();
  }, [actualPage, router.query.search, trigger]);

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
          <></>
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
