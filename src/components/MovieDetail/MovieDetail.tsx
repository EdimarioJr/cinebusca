/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  MovieContainer,
  BackgroundFilter,
  MovieInfo,
  WatchButton,
  ReviewButton,
} from "./styles";
import { motion } from "framer-motion";
import { upAnimation, opacityAnimation, CommonButton } from "@/styles/globals";
import { ReviewInput } from "./ReviewInput";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useAddInWatchlistMutation,
  useDeleteFromWatchlistMutation,
  useMovieExistsInWatchlistQuery,
} from "@/services";
import { toast } from "react-toastify";

import { Spinner } from "../Spinner";

export type MovieDetailProps = {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  genres: any[];
  budget: number;
  runtime: number;
  release_date: string;
  director: string;
  id: number;
};

export const MovieDetail = ({
  id,
  poster_path,
  title,
  vote_average,
  genres,
  budget,
  runtime,
  overview,
  release_date,
  director,
}: MovieDetailProps) => {
  const [reviewMode, setReviewMode] = useState(false);

  const [addInWatchlist, { isLoading: isLoadingAdd }] =
    useAddInWatchlistMutation();

  const [deleteFromWatchlist, { isLoading: isLoadingDelete }] =
    useDeleteFromWatchlistMutation();
  const user = useUser();

  const isLoadingWatchlist = isLoadingAdd || isLoadingDelete;

  const { data: watchlistId } = useMovieExistsInWatchlistQuery({
    movieId: id,
    user: user?.id ?? "",
  });

  async function handleAddWatchlist() {
    if (user && id) {
      try {
        await addInWatchlist({
          user: user.id,
          movieId: id,
          moviePoster: poster_path,
          movieTitle: title,
          movieScore: vote_average,
        }).unwrap();

        toast.success(`Movie added to your watchlist!`);
      } catch (err) {
        toast.error(`Error adding movie on watchlist: ${err}`);
      }
    }
  }

  async function handleDeleteFromWatchlist() {
    if (user && id && watchlistId) {
      try {
        await deleteFromWatchlist({
          id: watchlistId,
        }).unwrap();

        toast.success(`Movie removed from your watchlist!`);
      } catch (err) {
        toast.error(`Error deleting movie from watchlist: ${err}`);
      }
    }
  }

  return (
    <>
      <motion.div initial="initial" animate="final" variants={opacityAnimation}>
        <MovieContainer>
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            id="poster"
          />

          <MovieInfo>
            <BackgroundFilter
              back={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            />
            {reviewMode ? (
              <motion.section
                className="info"
                variants={upAnimation}
                initial="initial"
                animate="final"
              >
                <h1>
                  {title} <span id="director">by {director}</span>
                </h1>
                <ReviewInput
                  idMovie={id}
                  isReview={setReviewMode}
                  moviePoster={poster_path}
                  movieTitle={title}
                />
              </motion.section>
            ) : (
              <>
                <motion.section
                  className="info"
                  variants={upAnimation}
                  initial="initial"
                  animate="final"
                >
                  <h1>
                    {title} <span id="director">by {director}</span>
                  </h1>
                  {user ? (
                    <nav className="rowButtons">
                      <WatchButton
                        onClick={() =>
                          watchlistId
                            ? handleDeleteFromWatchlist()
                            : handleAddWatchlist()
                        }
                      >
                        {isLoadingWatchlist ? (
                          <Spinner boxSize="1.5rem" />
                        ) : watchlistId ? (
                          "Remove from Watchlist"
                        ) : (
                          "Add to your Watchlist"
                        )}
                      </WatchButton>
                      <ReviewButton onClick={() => setReviewMode(true)}>
                        Review
                      </ReviewButton>
                    </nav>
                  ) : (
                    <></>
                  )}

                  <h2>{vote_average.toFixed(2)}</h2>
                  <p className="description">{overview}</p>

                  <div className="genres">
                    <p>Genres:</p>

                    {genres.map((genre, index) => (
                      <CommonButton key={index} className="genre-button">
                        {genre.name}
                      </CommonButton>
                    ))}
                  </div>
                </motion.section>
                <div className="footer">
                  <aside>
                    <p>Budget:</p>
                    <p>{budget.toLocaleString("pt-BR", { currency: "BRL" })}</p>
                  </aside>
                  <aside>
                    <p>Duration:</p>
                    <p>{runtime} min</p>
                  </aside>
                  <aside>
                    <p>Release date:</p>
                    <p>{release_date}</p>
                  </aside>
                </div>
              </>
            )}
          </MovieInfo>
        </MovieContainer>
      </motion.div>
    </>
  );
};
