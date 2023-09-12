import { useUser } from "@supabase/auth-helpers-react";
import {
  useAddInWatchlistMutation,
  useDeleteFromWatchlistMutation,
  useMovieExistsInWatchlistQuery,
} from "@/services";
import { toast } from "react-toastify";

export type UseWatchlistParams = {
  movieId: number;
  moviePoster: string;
  movieTitle: string;
  movieScore: number;
};

export const useMovieWatchlist = ({
  movieId,
  moviePoster,
  movieTitle,
  movieScore,
}: UseWatchlistParams) => {
  const user = useUser();

  const [addInWatchlist, { isLoading: isLoadingAdd }] =
    useAddInWatchlistMutation();

  const [deleteFromWatchlist, { isLoading: isLoadingDelete }] =
    useDeleteFromWatchlistMutation();

  const isLoadingWatchlist = isLoadingAdd || isLoadingDelete;

  const { data: watchlistId } = useMovieExistsInWatchlistQuery(
    {
      movieId,
      user: user?.id ?? "",
    },
    { skip: !user }
  );

  async function handleAddWatchlist() {
    if (user && movieId) {
      try {
        await addInWatchlist({
          user: user.id,
          movieId: movieId,
          moviePoster,
          movieTitle,
          movieScore,
        }).unwrap();

        toast.success(`Movie added to your watchlist!`);
      } catch (err) {
        toast.error(`Error adding movie on watchlist: ${err}`);
      }
    }
  }

  async function handleDeleteFromWatchlist() {
    if (user && movieId && watchlistId) {
      try {
        await deleteFromWatchlist({
          id: watchlistId,
        }).unwrap();

        toast.success(`Movie removed from your watchlist!`);
      } catch (err) {
        toast.error(`Error deleting movie from watchlist: ${err}`);
      }
    }
  }

  return {
    handleDeleteFromWatchlist,
    handleAddWatchlist,
    isLoadingWatchlist,
    watchlistId,
  };
};
