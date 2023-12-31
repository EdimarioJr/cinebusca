import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

import { MovieCard } from "@/components";
import { MainLayout } from "@/layouts";
import { Movie } from "@/models";
import { useLazySearchMovieQuery } from "@/store/queries";
import { GridCenter, LoadMore, opacityAnimation } from "@/styles/globals";
import { debounce } from "@/utils";

import { SearchContainer, SearchInput, SearchInputContainer } from "./styles";

export const SearchResultsScreen = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [totalPages, setTotalPages] = useState(0);

  const [actualPage, setActualPage] = useState(1);
  const [search, setSearch] = useState("");

  const [searchMovie, { isLoading }] = useLazySearchMovieQuery();

  const getSearchedMovies = async (search: string, actualPage: number) => {
    const response = await searchMovie({
      query: search ?? "",
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

  useEffect(() => {
    setActualPage(1);
  }, [search]);

  useEffect(() => {
    getSearchedMovies(search, actualPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchMovies = useCallback(
    debounce(getSearchedMovies, 500),
    []
  );

  return (
    <MainLayout>
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              debouncedSearchMovies(e.target.value, 1);
            }}
          />
        </SearchInputContainer>

        {movies.length !== 0 ? (
          <motion.div className="grid">
            {movies.map((movie, index) => (
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
            ))}
          </motion.div>
        ) : (
          search &&
          !isLoading && (
            <GridCenter>
              <h1>No Movies Found!</h1>
            </GridCenter>
          )
        )}
      </SearchContainer>

      {actualPage >= totalPages ? (
        <></>
      ) : (
        <LoadMore onClick={() => setActualPage(actualPage + 1)}>
          Load More Search Results
        </LoadMore>
      )}
    </MainLayout>
  );
};
