import React, { useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import MovieData from "@/services/movieApi";

import { ContainerPages, opacityAnimation } from "@/styles/globals";
import { Footer, Header, Loading, MovieCard } from "@/components";
import { MovieDetails } from "@/models";
import { WatchlistContainer, RemoveButton } from "./styles";
import { useUser } from "@supabase/auth-helpers-react";
import { watchlistService } from "@/services";
import { toast } from "react-toastify";

type MovieDetailsWatchlist = MovieDetails & { idWatchlist: string };

export function WatchlistScreen() {
  const [movies, setMovies] = useState([] as MovieDetailsWatchlist[]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  async function handleRemove(idWatchlist: string) {
    if (user) {
      try {
        await watchlistService.deleteFromWatchlist({
          id: idWatchlist,
        });

        const newMovies = movies.filter(
          (movie) => movie.idWatchlist !== idWatchlist
        );

        setMovies(newMovies);
        toast.success("Movie removed from watchlist");
      } catch {
        toast.error("Error removing from watchlist");
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (user) {
        setIsLoading(true);
        try {
          const watchlist = await watchlistService.getWatchlist({
            userId: user.id,
          });

          if (watchlist.length > 0) {
            const moviesWatchlist = await Promise.allSettled(
              watchlist.map(async (current) => {
                if (current) {
                  const aux = await MovieData.getMovie(current.movieId);
                  return { idWatchlist: current.id, ...aux };
                }
              })
            );

            setMovies(
              moviesWatchlist
                .filter((promise) => promise.status === "fulfilled")
                .map(
                  (promise) =>
                    (promise as PromiseFulfilledResult<MovieDetailsWatchlist>)
                      .value
                )
            );

            setIsLoading(false);
          }
        } catch {
          toast.error("Error fetching the watchlist");
          setIsLoading(false);
        }
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
                    <RemoveButton
                      id={movie.idWatchlist}
                      onClick={() => handleRemove(movie.idWatchlist)}
                    >
                      Remove
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
