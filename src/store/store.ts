import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import reviewsReducer from "./slices/reviewSlice";
import watchlistReducer from "./slices/watchlistSlice";
import { rtkQueryErrorLogger } from "./errorLogger";
import { movieQueries, reviewQueries, watchlistQueries } from "./queries";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    reviews: reviewsReducer,
    [movieQueries.reducerPath]: movieQueries.reducer,
    [watchlistQueries.reducerPath]: watchlistQueries.reducer,
    [reviewQueries.reducerPath]: reviewQueries.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(watchlistQueries.middleware)
      .concat(movieQueries.middleware)
      .concat(reviewQueries.middleware)
      .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
