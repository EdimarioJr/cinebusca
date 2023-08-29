import React, { useEffect, useState } from "react";
import {
  MovieContainer,
  BackgroundFilter,
  MovieInfo,
  WatchButton,
  ReviewButton,
} from "./styles";
import dbAPI from "@/services/dbApi";
import auth from "@/services/auth";
import { motion } from "framer-motion";
import { upAnimation, opacityAnimation, CommonButton } from "@/styles/globals";
import { ReviewInput } from "./ReviewInput";

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
  /* 
    flags that indicates if the movie is in the user watchlist already/
    if the user want to write a review bout the movie
  */
  const [inWatchlist, setInWatchlist] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    // everytime that the movie change the mode review is reseted
    setReviewMode(false);
    (async () => {
      // if the sessionStorage has a valid token
      if (auth.isAuthenticated()) {
        dbAPI.get("/watchlist").then((response: any) => {
          const { watchlist } = response.data;
          /* if DB returns a succesful watchlist operation flag  &&
          if the movie is in watchlist */
          if (watchlist && watchlist.includes(String(id))) {
            setInWatchlist(true);
          } else setInWatchlist(false);
        });
      }
    })();
  }, [id]);

  async function handleAddWatchlist() {
    if (auth.isAuthenticated()) {
      // if the movie is already in the watchlist, will delete
      if (inWatchlist) {
        await dbAPI.delete("/watchlist", { params: { idMovie: id } });
        setInWatchlist(false);
      } else {
        // if has a valid ID
        if (id) {
          await dbAPI.post("/watchlist", { idMovie: id });
          setInWatchlist(true);
        }
      }
    } else alert("Do the login to perform this operation!");
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
                <ReviewInput idMovie={id} isReview={setReviewMode} />
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
                  {auth.isAuthenticated() ? (
                    <nav className="rowButtons">
                      <WatchButton onClick={handleAddWatchlist}>
                        {inWatchlist
                          ? "Remove from Watchlist"
                          : "Add to your Watchlist"}
                      </WatchButton>
                      <ReviewButton onClick={() => setReviewMode(true)}>
                        Review
                      </ReviewButton>
                    </nav>
                  ) : (
                    ""
                  )}

                  <h2>{vote_average}</h2>
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
                    <p>{budget}</p>
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
