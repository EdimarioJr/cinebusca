import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

import { useDeleteReviewMutation, useGetReviewsQuery } from "@/store/queries";
import { useState } from "react";

export const useReview = () => {
  const user = useUser();
  const [idReviewToBeDeleted, setIdReviewToBeDeleted] = useState("");

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
        setIdReviewToBeDeleted(id);
        await deleteReview({ id }).unwrap();
        toast.success("Review deleted!");
      } catch (err) {
        toast.error("Error deleting the review");
      } finally {
        setIdReviewToBeDeleted("");
      }
    }
  }

  return {
    handleDeleteReview,
    reviews,
    isLoading,
    isLoadingDelete,
    idReviewToBeDeleted,
  };
};
