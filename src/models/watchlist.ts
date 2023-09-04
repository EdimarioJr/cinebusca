export type Watchlist = {
  id: string;
  movieId: number;
  user: string;
};

export type CreateWatchlist = Pick<Watchlist, "movieId" | "user">;

export type DeleteWatchlist = Pick<Watchlist, "id">;
