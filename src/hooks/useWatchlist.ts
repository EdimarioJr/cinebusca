import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

import {
  useDeleteFromWatchlistMutation,
  useGetWatchlistQuery,
} from "@/store/queries";

export const useWatchlist = () => {
  const user = useUser();

  const { data: watchlist, isLoading: isLoadingWatchlist } =
    useGetWatchlistQuery({ userId: user?.id ?? "" }, { skip: !user?.id });

  const [deleteWatchlist, { isLoading: isLoadingDelete }] =
    useDeleteFromWatchlistMutation();

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
  return { handleRemove, watchlist, isLoadingWatchlist, isLoadingDelete };
};
