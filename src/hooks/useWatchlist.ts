import { useUser } from "@supabase/auth-helpers-react";
import {
  useDeleteFromWatchlistMutation,
  useGetWatchlistQuery,
} from "@/services";
import { toast } from "react-toastify";

export const useWatchlist = () => {
  const user = useUser();

  const { data: watchlist, isLoading: isLoadingWatchlist } =
    useGetWatchlistQuery({ userId: user?.id ?? "" });

  const [deleteWatchlist] = useDeleteFromWatchlistMutation();

  async function handleRemove(idWatchlist: string) {
    if (user) {
      try {
        await deleteWatchlist({
          id: idWatchlist,
        }).unwrap();

        toast.success("Movie removed from watchlist");
      } catch {
        toast.error("Error removing from watchlist");
      }
    }
  }
  return { handleRemove, watchlist, isLoadingWatchlist };
};
