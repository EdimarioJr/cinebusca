import { useState, useEffect } from "react";

import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useEditReviewMutation,
  useGetMovieReviewQuery,
} from "@/services";

export type UseMovieReviewParams = {
  idMovie: number;
  moviePoster: string;
  movieTitle: string;
};

export const useMovieReview = ({
  idMovie,
  moviePoster,
  movieTitle,
}: UseMovieReviewParams) => {
  const user = useUser();
  const [reviewText, setReviewText] = useState("");

  const { data: reviewApi } = useGetMovieReviewQuery(
    {
      movieId: idMovie,
      userId: user?.id ?? "",
    },
    { skip: !user?.id }
  );

  const [createReview, { isLoading: isLoadingCreateReview }] =
    useCreateReviewMutation();

  const [editReview, { isLoading: isLoadingEditReview }] =
    useEditReviewMutation();

  useEffect(() => {
    if (reviewApi) {
      setReviewText(reviewApi.review);
    }
  }, [reviewApi]);

  async function handleCreateReview() {
    if (user) {
      try {
        await createReview({
          user: user.id,
          movieId: idMovie,
          review: reviewText,
          moviePoster,
          movieTitle,
          date: new Date().toISOString(),
        }).unwrap();

        toast.success("Success on creating the review!");
      } catch {
        toast.error("Creating Review error!");
      }
    }
  }

  async function handleEditReview() {
    if (user && reviewApi) {
      try {
        await editReview({
          id: reviewApi.id,
          review: reviewText,
          date: new Date().toISOString(),
        }).unwrap();
        toast.success("Success on editing the review!");
      } catch {
        toast.error("Editing Review error!");
      }
    }
  }

  function handleCancelReview() {
    setReviewText("");
  }

  return {
    handleEditReview,
    handleCancelReview,
    handleCreateReview,
    isLoadingCreateReview,
    isLoadingEditReview,
    reviewText,
    setReviewText,
    reviewApi,
  };
};
