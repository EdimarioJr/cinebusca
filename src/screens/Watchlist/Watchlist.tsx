import React from "react";
import { motion } from "framer-motion";

import { ContainerPages, opacityAnimation } from "@/styles/globals";
import { Footer, Header, Loading, MovieCard } from "@/components";

import { WatchlistContainer, RemoveButton } from "./styles";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useDeleteFromWatchlistMutation,
  useGetWatchlistQuery,
} from "@/services";
import { toast } from "react-toastify";

export function WatchlistScreen() {
  const user = useUser();

  const { data: watchlist, isLoading: isLoadingWatchlist } =
    useGetWatchlistQuery({ userId: user?.id ?? "" });

  const [deleteWatchlist] = useDeleteFromWatchlistMutation();

  async function handleRemove(idWatchlist: string) {
    if (user) {
      try {
        await deleteWatchlist({
          id: idWatchlist,
        }).unwrap();

        toast.success("Movie removed from watchlist");
      } catch {
        toast.error("Error removing from watchlist");
      }
    }
  }

  return (
    <>
      <Header watchlist />
      <ContainerPages>
        {isLoadingWatchlist ? (
          <Loading />
        ) : (
          <WatchlistContainer>
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
