import { supabase } from "@/config";
import {
  CreateWatchlist,
  DeleteWatchlist,
  Watchlist,
} from "@/models/watchlist";

export type BaseWatchlistOperationParams = {
  userId: string;
  movieId: number;
};

export type GetWatchlistParams = { userId: string };

export type InWatchlistParams = BaseWatchlistOperationParams;

export type GetMovieWatchlist = { user: string; movieId: number };

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const watchlistService = createApi({
  reducerPath: "watchlistService",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Watchlist"],
  endpoints: (builder) => ({
    getWatchlist: builder.query<Watchlist[] | [], GetWatchlistParams>({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("watchlist")
          .select("*")
          .eq("user", userId);

        if (error) return { error };

        return { data };
      },
      providesTags: [{ type: "Watchlist", id: "LIST" }],
    }),
    movieExistsInWatchlist: builder.query<string, GetMovieWatchlist>({
      queryFn: async ({ user, movieId }) => {
        const { data, error } = await supabase
          .from("watchlist")
          .select("id")
          .eq("user", user)
          .eq("movieId", movieId);

        if (error) return { error };

        return { data: data[0]?.id ?? "" };
      },
      providesTags: [{ type: "Watchlist", id: "CHECK" }],
    }),
    addInWatchlist: builder.mutation<Watchlist, CreateWatchlist>({
      queryFn: async ({
        movieId,
        user,
        moviePoster,
        movieTitle,
        movieScore,
      }: CreateWatchlist) => {
        const { error, data } = await supabase
          .from("watchlist")
          .insert({ movieId, user: user, moviePoster, movieTitle, movieScore })
          .select("*");

        if (error) return { error };

        return { data: data[0] };
      },
      invalidatesTags: [
        { type: "Watchlist", id: "LIST" },
        { type: "Watchlist", id: "CHECK" },
      ],
    }),
    deleteFromWatchlist: builder.mutation<boolean, DeleteWatchlist>({
      queryFn: async ({ id }: DeleteWatchlist) => {
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("id", id);
        if (error) return { error };

        return { data: true };
      },
      invalidatesTags: [
        { type: "Watchlist", id: "LIST" },
        { type: "Watchlist", id: "CHECK" },
      ],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddInWatchlistMutation,
  useDeleteFromWatchlistMutation,
  useMovieExistsInWatchlistQuery,
} = watchlistService;
