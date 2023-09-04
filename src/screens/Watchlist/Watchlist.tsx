import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { authService } from "@/services/auth";
import dbAPI from "@/services/dbApi";
import MovieData from "@/services/movieApi";

import { ContainerPages, opacityAnimation } from "@/styles/globals";
import { Footer, Header, Loading, MovieCard } from "@/components";
import { Movie } from "@/models";
import { WatchlistContainer, RemoveButton } from "./styles";
import { useUser } from "@supabase/auth-helpers-react";
import { watchlistService } from "@/services";

export function WatchlistScreen() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  async function handleRemove(event: any) {
    if (user) {
      const idMovie = event.target.id;
      const response = await dbAPI.delete("/watchlist", {
        params: { idMovie },
      });
      if (response.data.watchlist) {
        // if the delete op was successful, it will update the local movies watchlist state
        const newMovies = [] as Movie[];
        movies.forEach((movie) => {
          if (movie) if (movie.id !== Number(idMovie)) newMovies.push(movie);
        });
        setMovies(newMovies);
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (user) {
        setIsLoading(true);
        watchlistService
          .getWatchlist({ userId: user.id })
          .then(async (response) => {
            const watchlist = response;
            if (watchlist) {
              if (watchlist.length > 0) {
                // getting each movie info from the movie api
                const moviesWatchlist = await Promise.all(
                  watchlist.map(async (current) => {
                    if (current) {
                      const aux = await MovieData.getMovie(current.movieId);
                      return aux;
                    }
                  })
                );
                setMovies(moviesWatchlist as any);
              }
              setIsLoading(false);
            }
          });
      }
    })();
  }, [router, user]);

  return (
    <>
      <Header watchlist />
      <ContainerPages>
        {isLoading ? (
          <Loading />
        ) : (
          <WatchlistContainer>
            {movies.length !== 0 ? (
              <section className="grid">
                {movies.map((movie, index) => (
                  <motion.div
                    initial="initial"
                    animate="final"
                    variants={opacityAnimation}
                    className="card"
                    key={index}
                  >
                    <MovieCard
                      idMovie={movie.id}
                      title={movie.original_title}
                      score={movie.vote_average}
                      poster={movie.poster_path}
                    />
                    <RemoveButton id={movie.id} onClick={handleRemove}>
                      Remove from watchlist
                    </RemoveButton>
                  </motion.div>
                ))}
              </section>
            ) : (
              <h1>No movies</h1>
            )}
          </WatchlistContainer>
        )}
      </ContainerPages>
      <Footer />
    </>
  );
}
