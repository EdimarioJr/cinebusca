import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useCallback, useEffect } from "react";

import { supabase } from "@/config";
import { userService } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { selectFeed, setFeed } from "@/store/slices";
import {
  Activity,
  ActivityReviewFromApi,
  ActivityWatchlistFromApi,
  BaseActivity,
  BaseActivityFromApi,
  ReviewActivity,
  WatchlistActivity,
} from "@/models";

type RealtimePayload = RealtimePostgresChangesPayload<any & { user: string }>;

export const useSubscribeToActivities = () => {
  const feed = useSelector(selectFeed);
  const dispatch = useDispatch();
  const addActivity = useCallback(
    async (payload: RealtimePayload) => {
      const newData = payload.new as
        | ActivityWatchlistFromApi
        | ActivityReviewFromApi;

      const userId = (payload.new as BaseActivityFromApi)?.user;
      const type = payload.new.entity as Activity["entity"];

      if (userId) {
        const response = await userService.getUsername({ id: userId });

        const baseFormattedNewData = {
          moviePoster: newData.movie_poster,
          movieTitle: newData.movie_title,
          movieId: newData.movie_id,
          user: newData.user,
          id: newData.id,
          username: "data" in response ? response.data : "--",
        } as BaseActivity;

        const formattedNewData =
          type === "watchlist"
            ? ({
                ...baseFormattedNewData,
                movieScore: (newData as ActivityWatchlistFromApi).movie_score,
                entity: "watchlist",
              } as WatchlistActivity)
            : ({
                ...baseFormattedNewData,
                review: (newData as ActivityReviewFromApi).review,
                date: (newData as ActivityReviewFromApi).date,
                entity: "review",
              } as ReviewActivity);

        dispatch(
          setFeed({
            ...formattedNewData,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const channel = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activity_log",
        },
        async (payload: RealtimePayload) => {
          addActivity(payload);
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [addActivity]);

  return { activities: feed };
};
