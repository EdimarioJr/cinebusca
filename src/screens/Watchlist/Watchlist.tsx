import { motion } from "framer-motion";
import React from "react";

import { Loading, MovieCard, Spinner } from "@/components";
import { useWatchlist } from "@/hooks";
import { MainLayout } from "@/layouts";
import { opacityAnimation } from "@/styles/globals";

import { RemoveButton, WatchlistContainer, WatchlistGrid } from "./styles";

export function WatchlistScreen() {
  const {
    isLoadingWatchlist,
    watchlist,
    handleRemove,
    isLoadingDelete,
    idWatchlistToBeDeleted,
  } = useWatchlist();

  return (
    <MainLayout page="watchlist">
      <WatchlistContainer>
        <h1>My watchlists</h1>
        {isLoadingWatchlist ? (
          <Loading />
        ) : (
          <WatchlistGrid
            initial="initial"
            animate="final"
            variants={opacityAnimation}
          >
            {watchlist?.length !== 0 ? (
              <section className="grid">
                {watchlist?.map((item, index) => (
                  <motion.div
                    initial="initial"
                    animate="final"
                    variants={opacityAnimation}
                    className="card"
                    key={index}
                  >
                    <MovieCard
                      idMovie={item.movieId}
                      title={item.movieTitle}
                      score={item.movieScore}
                      poster={item.moviePoster}
                    />
                    <RemoveButton
                      id={item.id}
                      onClick={() => handleRemove(item.id)}
                      data-test="remove-watchlist-button"
                    >
                      {isLoadingDelete && idWatchlistToBeDeleted === item.id ? (
                        <Spinner boxSize="1.5rem" />
                      ) : (
                        "Remove"
                      )}
                    </RemoveButton>
                  </motion.div>
                ))}
              </section>
            ) : (
              <h1>No movies</h1>
            )}
          </WatchlistGrid>
        )}
      </WatchlistContainer>
    </MainLayout>
  );
}
