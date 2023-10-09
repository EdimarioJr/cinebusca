import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { Activity } from "@/models";

interface FeedState {
  feed: Activity[];
}

const initialState: FeedState = {
  feed: [],
};

export const feedService = createSlice({
  name: "feed",
  initialState,
  reducers: {
    resetFeed: (state) => {
      state.feed = [];
    },
    setFeed: (state, action: PayloadAction<Activity>) => {
      state.feed = [...state.feed, action.payload];
    },
  },
});

export const { resetFeed, setFeed } = feedService.actions;

export const selectFeed = (state: RootState) => state.feed.feed;

export default feedService.reducer;
