import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import {
  movieService,
  reviewService,
  rtkQueryErrorLogger,
  watchlistService,
} from "@/services";

import reviewsReducer from "./slices/reviewSlice";
import watchlistReducer from "./slices/watchlistSlice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    reviews: reviewsReducer,
    [movieService.reducerPath]: movieService.reducer,
    [watchlistService.reducerPath]: watchlistService.reducer,
    [reviewService.reducerPath]: reviewService.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(watchlistService.middleware)
      .concat(movieService.middleware)
      .concat(reviewService.middleware)
      .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
