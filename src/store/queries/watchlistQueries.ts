import {
  CreateWatchlist,
  DeleteWatchlist,
  Watchlist,
} from "@/models/watchlist";
import {
  GetMovieWatchlist,
  GetWatchlistParams,
  watchlistService,
} from "@/services";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const watchlistQueries = createApi({
  reducerPath: "watchlistQueries",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Watchlist"],
  endpoints: (builder) => ({
    getWatchlist: builder.query<Watchlist[] | [], GetWatchlistParams>({
      queryFn: async ({ userId }) => {
        const data = await watchlistService.getWatchlist({ userId });

        return { data };
      },
      providesTags: [{ type: "Watchlist", id: "LIST" }],
    }),
    movieExistsInWatchlist: builder.query<string, GetMovieWatchlist>({
      queryFn: async ({ user, movieId }) => {
        const watchlistId = await watchlistService.movieExistsInWatchlist({
          userId: user,
          movieId,
        });

        return { data: watchlistId };
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
        const watchlist = await watchlistService.addInWatchlist({
          user,
          movieId,
          moviePoster,
          movieTitle,
          movieScore,
        });

        return { data: watchlist };
      },
      invalidatesTags: [
        { type: "Watchlist", id: "LIST" },
        { type: "Watchlist", id: "CHECK" },
      ],
    }),
    deleteFromWatchlist: builder.mutation<boolean, DeleteWatchlist>({
      queryFn: async ({ id }: DeleteWatchlist) => {
        await watchlistService.deleteFromWatchlist({ id });

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
} = watchlistQueries;
