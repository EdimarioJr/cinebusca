import { createSlice } from "@reduxjs/toolkit";

import { Review } from "@/models/review";

import type { RootState } from "../store";

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.reviews = [];
    },
  },
});

export const { resetReviews } = reviewSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReview = (state: RootState) => state.reviews;

export default reviewSlice.reducer;
