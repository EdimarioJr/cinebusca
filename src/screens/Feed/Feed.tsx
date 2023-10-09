import React from "react";

import { MovieCard, ReadonlyReviewCard } from "@/components";
import { MainLayout } from "@/layouts";
import { opacityAnimation } from "@/styles/globals";
import { FeedContainer, UpdatesContainer } from "./styles";
import { motion } from "framer-motion";
import { useSubscribeToActivities } from "@/hooks";

export const FeedScreen = () => {
  const { activities } = useSubscribeToActivities();

  return (
    <MainLayout page="feed">
      <FeedContainer>
        <h1>Happening now...</h1>
        <UpdatesContainer
          initial="initial"
          animate="final"
          variants={opacityAnimation}
        >
          <section className="feed">
            {activities?.map((activity) => {
              const { movieId, moviePoster, movieTitle, entity, username } =
                activity;

              if (entity === "review") {
                return (
                  <motion.div
                    initial="initial"
                    animate="final"
                    variants={opacityAnimation}
                    key={movieId}
                    className="user-notification"
                  >
                    <h4 className="username">
                      <span>{username}</span> just reviewed this movie
                    </h4>
                    <ReadonlyReviewCard {...activity} />;
                  </motion.div>
                );
              }

              return (
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={opacityAnimation}
                  key={movieId}
                >
                  <h4 className="username">
                    <span>{username}</span> just added this movie to his
                    watchlist
                  </h4>
                  <MovieCard
                    key={movieId}
                    title={movieTitle}
                    idMovie={movieId}
                    poster={moviePoster}
                    score={activity.movieScore}
                  />
                </motion.div>
              );
            })}
          </section>
        </UpdatesContainer>
      </FeedContainer>
    </MainLayout>
  );
};
