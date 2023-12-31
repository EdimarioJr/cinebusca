/* eslint-disable @next/next/no-img-element */
import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { ReviewModal } from "@/components";
import { useMovieWatchlist } from "@/hooks";
import { upAnimation, opacityAnimation, CommonButton } from "@/styles/globals";

import { Spinner } from "../../../../components/Spinner";

import {
  MovieContainer,
  BackgroundFilter,
  MovieInfo,
  WatchButton,
  ReviewButton,
} from "./styles";

export type MovieDetailProps = {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  genres: { name: string }[];
  budget: number;
  runtime: number;
  release_date: string;
  director: string;
  id: number;
};

const dolar = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  const {
    handleAddWatchlist,
    handleDeleteFromWatchlist,
    isLoadingWatchlist,
    watchlistId,
    isLoadingCheckingWatchlist,
  } = useMovieWatchlist({
    movieId: id,
    moviePoster: poster_path,
    movieTitle: title,
    movieScore: vote_average,
  });

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
              $back={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            />

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
                    onClick={() => {
                      if (
                        !isLoadingCheckingWatchlist ||
                        isLoadingCheckingWatchlist
                      )
                        watchlistId
                          ? handleDeleteFromWatchlist()
                          : handleAddWatchlist();
                    }}
                    data-test="watchlist-button"
                    disabled={isLoadingWatchlist || isLoadingCheckingWatchlist}
                  >
                    {isLoadingWatchlist || isLoadingCheckingWatchlist ? (
                      <Spinner boxSize="1.5rem" />
                    ) : watchlistId ? (
                      "Remove from Watchlist"
                    ) : (
                      "Add to your Watchlist"
                    )}
                  </WatchButton>
                  <ReviewButton
                    onClick={() => setIsOpen(true)}
                    data-test="review-button"
                  >
                    Review
                  </ReviewButton>
                  <ReviewModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    id={id}
                    poster_path={poster_path}
                    title={title}
                  />
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
                <p>{dolar.format(budget)}</p>
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
          </MovieInfo>
        </MovieContainer>
      </motion.div>
    </>
  );
};
