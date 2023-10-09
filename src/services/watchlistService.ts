import { supabase } from "@/config";
import {
  CreateWatchlist,
  DeleteWatchlist,
  Watchlist,
} from "@/models/watchlist";

export type BaseWatchlistOperationParams = {
  userId: string;
  movieId: number;
};

export type GetWatchlistParams = { userId: string };

export type InWatchlistParams = BaseWatchlistOperationParams;

export type GetMovieWatchlist = { user: string; movieId: number };

class WatchlistService {
  async getWatchlist({
    userId,
  }: GetWatchlistParams): Promise<Watchlist[] | []> {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user", userId);

    if (error) throw new Error(error.message);

    return data;
  }

  async getMovieWatchlist({
    user,
    movieId,
  }: GetMovieWatchlist): Promise<Watchlist | null> {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user", user)
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return data.length ? data[0] : null;
  }

  async movieExistsInWatchlist({
    userId,
    movieId,
  }: InWatchlistParams): Promise<string> {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user", userId)
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return data[0]?.id ?? "";
  }

  async addInWatchlist({
    user,
    movieId,
    moviePoster,
    movieScore,
    movieTitle,
  }: CreateWatchlist): Promise<Watchlist> {
    const { error, data } = await supabase
      .from("watchlist")
      .insert({ movieId, user, moviePoster, movieTitle, movieScore })
      .select("*");

    if (error) throw new Error(error.message);

    return data[0];
  }

  async deleteFromWatchlist({ id }: DeleteWatchlist) {
    const { error } = await supabase.from("watchlist").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}

export const watchlistService = new WatchlistService();
