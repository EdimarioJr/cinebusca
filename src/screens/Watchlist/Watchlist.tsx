import React, { useState, useEffect } from "react";
import { WatchlistContainer, RemoveButton } from "./styles";
import auth from "@/services/auth";
import dbAPI from "@/services/dbApi";
import MovieData from "@/services/movieApi";

import { ContainerPages, opacityAnimation } from "@/styles/globals";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Footer, Header, Loading, MovieCard } from "@/components";
import { Movie } from "@/models";

export const Watchlist = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRemove(event: any) {
    if (auth.isAuthenticated()) {
      const idMovie = event.target.id;
      const response = await dbAPI.delete("/watchlist", {
        params: { idMovie },
      });
      if (response.data.watchlist) {
        // if the delete op was successful, it will update the local movies watchlist state
        let newMovies = [] as Movie[];
        movies.forEach((movie) => {
          if (movie) if (movie.id !== Number(idMovie)) newMovies.push(movie);
        });
        setMovies(newMovies);
      } else {
        alert(response.data.message);
        auth.logout();
        router.push("/");
      }
    } else {
      alert("You don't have the permission to do this!");
      router.push("/login");
    }
  }

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setIsLoading(true);
      dbAPI.get("/watchlist").then(async (response) => {
        let { watchlist, message } = response.data;
        if (watchlist) {
          if (watchlist.length > 0 && isMounted) {
            // getting each movie info from the movie api
            let moviesWatchlist = await Promise.all(
              watchlist.map(async (current: any) => {
                if (current) {
                  let aux = await MovieData.getMovie(current);
                  return aux;
                }
              })
            );
            setMovies(moviesWatchlist);
          }
          setIsLoading(false);
        } else {
          alert(message);
          auth.logout();
          router.push("/");
        }
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [router]);

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
                {movies.map((movie, index) => {
                  return (
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
                  );
                })}
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
};
