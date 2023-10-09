import { createSlice } from "@reduxjs/toolkit";

import { Watchlist } from "@/models/watchlist";

import type { RootState } from "../store";

interface WatchlistState {
  watchlist: Watchlist[];
}

const initialState: WatchlistState = {
  watchlist: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    resetWatchlist: (state) => {
      state.watchlist = [];
    },
  },
});

export const { resetWatchlist } = watchlistSlice.actions;

export const selectWatchlist = (state: RootState) => state.watchlist.watchlist;

export default watchlistSlice.reducer;
