import { MovieCard, ReadonlyReviewCard, ReviewCard } from "@/components";
import { supabase } from "@/config";
import { MainLayout } from "@/layouts";
import { Movie } from "@/models";
import { Review } from "@/models/review";
import { userService } from "@/services";
import { opacityAnimation } from "@/styles/globals";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

type BaseActivity = {
  moviePoster: string;
  movieId: number;
  movieTitle: string;
  movieScore: number;
  username: string;
};

type WatchlistActivity = BaseActivity & { type: "watchlist" };
type ReviewActivity = BaseActivity & {
  type: "review";
  review: string;
  date: Date;
};

export type Activity = WatchlistActivity | ReviewActivity;

export const UpdatesContainer = styled(motion.section)`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .feed {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Feed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        async (
          payload: RealtimePostgresChangesPayload<any & { user: string }>
        ) => {
          const userId = (payload.new as Movie & { user: string })?.user;
          const movie = payload.new;
          const type = payload.table as Activity["type"];
          console.log("movie", movie, payload);
          if (userId) {
            const response = await userService.getUsername({ id: userId });

            setActivities((old) => [
              ...old,
              {
                ...movie,
                username: "data" in response ? response.data : "--",
                type,
              },
            ]);
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <MainLayout>
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
              movieScore,
              movieTitle,
              type,
              username,
            } = activity;

            if (type === "review") {
              return (
                <>
                  <h4>{username} just reviewed this movie</h4>
                  <ReadonlyReviewCard key={movieId} {...activity} />;
                </>
              );
            }

            return (
              <>
                <h4>{username} just added this movie to his watchlist</h4>
                <MovieCard
                  key={movieId}
                  title={movieTitle}
                  idMovie={movieId}
                  poster={moviePoster}
                  score={movieScore}
                />
              </>
            );
          })}
        </section>
      </UpdatesContainer>
    </MainLayout>
  );
};

export default Feed;
