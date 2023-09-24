import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import { MovieCard, ReadonlyReviewCard } from "@/components";
import { supabase } from "@/config";
import { MainLayout } from "@/layouts";
import { Movie } from "@/models";
import { userService } from "@/services";
import { opacityAnimation } from "@/styles/globals";
import { FeedContainer, UpdatesContainer } from "./styles";

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

export const FeedScreen = () => {
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
      </FeedContainer>
    </MainLayout>
  );
};
