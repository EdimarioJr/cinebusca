import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/config";
import { Movie } from "@/models";
import { userService } from "@/services";

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

type RealtimePayload = RealtimePostgresChangesPayload<any & { user: string }>;

export const useSubscribeToActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = useCallback(async (payload: RealtimePayload) => {
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
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "watchlist",
        },
        async (payload: RealtimePayload) => {
          addActivity(payload);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "review",
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

  return { activities };
};
