import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

import { useDeleteReviewMutation, useGetReviewsQuery } from "@/store/queries";

export const useReview = () => {
  const user = useUser();

  const { data: reviews, isLoading } = useGetReviewsQuery(
    {
      userId: user?.id ?? "",
    },
    { skip: !user }
  );
  const [deleteReview, { isLoading: isLoadingDelete }] =
    useDeleteReviewMutation();

  async function handleDeleteReview(id: string) {
    if (user) {
      try {
        await deleteReview({ id }).unwrap();
        toast.success("Review deleted!");
      } catch (err) {
        toast.error("Error deleting the review");
      }
    }
  }

  return { handleDeleteReview, reviews, isLoading, isLoadingDelete };
};
