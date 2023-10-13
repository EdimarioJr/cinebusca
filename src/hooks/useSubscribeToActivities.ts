import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useCallback, useEffect } from "react";

import { supabase } from "@/config";

import {
  Activity,
  ActivityFromApi,
  ActivityReviewFromApi,
  ActivityWatchlistFromApi,
  BaseActivity,
  BaseActivityFromApi,
  ReviewActivity,
  WatchlistActivity,
} from "@/models";

export type UseSubscribeToActivitiesParams = {
  addNewActivity: (activity: Activity) => void;
};

type RealtimePayload = RealtimePostgresChangesPayload<any & { user: string }>;

export const formatApiActivityToCinebuscaActivity = (
  activity: ActivityFromApi
) => {
  const baseFormattedNewData = {
    moviePoster: activity.movie_poster,
    movieTitle: activity.movie_title,
    movieId: activity.movie_id,
    user: activity.user,
    id: activity.id,
    username: activity.username,
    createdAt: activity.created_at,
  } as BaseActivity;

  const formattedNewData =
    activity.entity === "watchlist"
      ? ({
          ...baseFormattedNewData,
          movieScore: (activity as ActivityWatchlistFromApi).movie_score,
          entity: "watchlist",
        } as WatchlistActivity)
      : ({
          ...baseFormattedNewData,
          review: (activity as ActivityReviewFromApi).review,
          date: (activity as ActivityReviewFromApi).date,
          entity: "review",
        } as ReviewActivity);

  return formattedNewData;
};

export const useSubscribeToActivities = ({
  addNewActivity,
}: UseSubscribeToActivitiesParams) => {
  const addActivity = useCallback(
    async (payload: RealtimePayload) => {
      const userId = (payload.new as BaseActivityFromApi)?.user;

      if (userId) {
        const formattedNewData = formatApiActivityToCinebuscaActivity(
          payload.new
        );

        addNewActivity({
          ...formattedNewData,
        });
      }
    },
    [addNewActivity]
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
};
