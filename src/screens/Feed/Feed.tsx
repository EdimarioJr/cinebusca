import React, { useEffect, useState } from "react";

import { MovieCard, ReadonlyReviewCard } from "@/components";
import { MainLayout } from "@/layouts";
import { opacityAnimation } from "@/styles/globals";
import { FeedContainer, UpdatesContainer } from "./styles";
import { motion } from "framer-motion";
import {
  formatApiActivityToCinebuscaActivity,
  useSubscribeToActivities,
} from "@/hooks";
import { Activity } from "@/models";
import { feedService } from "@/services";

export const FeedScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([] as Activity[]);

  const handleAddNewActivity = (activity: Activity) => {
    setActivities((old) => [activity, ...old]);
  };

  useSubscribeToActivities({ addNewActivity: handleAddNewActivity });

  useEffect(() => {
    const getPreviousActivities = async () => {
      const response = await feedService.getFeed();
      console.log("response", response);
      const activities = response.map((activity) =>
        formatApiActivityToCinebuscaActivity(activity)
      );
      setActivities(activities);
    };

    getPreviousActivities();
  }, []);

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
              const {
                movieId,
                moviePoster,
                movieTitle,
                entity,
                username,
                createdAt,
              } = activity;

              if (entity === "review") {
                return (
                  <motion.div
                    initial="initial"
                    animate="final"
                    variants={opacityAnimation}
                    key={movieId + username + entity}
                    className="user-notification"
                  >
                    <h4 className="username">
                      <span>{username ?? "--"}</span> just reviewed this movie -{" "}
                      {createdAt && (
                        <span>
                          {new Date(createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      )}
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
                    <span>{username ?? "--"}</span> just added this movie to his
                    watchlist -{" "}
                    {createdAt && (
                      <span>
                        {new Date(createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    )}
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
