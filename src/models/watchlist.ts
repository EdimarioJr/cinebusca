export type Watchlist = {
  id: string;
  movieId: number;
  user: string;
  moviePoster: string;
  movieTitle: string;
  movieScore: number;
};

export type CreateWatchlist = Omit<Watchlist, "id">;

export type DeleteWatchlist = Pick<Watchlist, "id">;
