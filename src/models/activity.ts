export type BaseActivityFromApi = {
  id: number;
  movie_poster: string;
  movie_id: number;
  movie_title: string;
  user: string;
};

export type ActivityWatchlistFromApi = BaseActivityFromApi & {
  movie_score: number;
  entity: "watchlist";
};

export type ActivityReviewFromApi = BaseActivityFromApi & {
  review: string;
  date: Date;
  entity: "review";
};

export type BaseActivity = {
  moviePoster: string;
  movieId: number;
  movieTitle: string;
  username: string;
};

export type WatchlistActivity = BaseActivity & {
  entity: "watchlist";
  movieScore: number;
};
export type ReviewActivity = BaseActivity & {
  entity: "review";
  review: string;
  date: Date;
};

export type ActivityFromApi = ActivityReviewFromApi | ActivityWatchlistFromApi;

export type Activity = WatchlistActivity | ReviewActivity;
