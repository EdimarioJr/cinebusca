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

// Other code such as selectors can use the imported `RootState` type
export const selectWatchlist = (state: RootState) => state.watchlist;

export default watchlistSlice.reducer;
