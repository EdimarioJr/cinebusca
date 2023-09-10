import React, { useState, useEffect } from "react";
import { ReviewContainer, AddReview, CancelReview } from "./styles";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import {
  reviewService,
  useCreateReviewMutation,
  useEditReviewMutation,
  useGetMovieReviewQuery,
} from "@/services";
import { Spinner } from "..";

export type ReviewInputProps = {
  idMovie: number;
  isReview: (value: boolean) => void;
  moviePoster: string;
  movieTitle: string;
};

export const ReviewInput = ({
  idMovie,
  isReview,
  moviePoster,
  movieTitle,
}: ReviewInputProps) => {
  const [reviewText, setReviewText] = useState("");

  const user = useUser();

  const { data: reviewApi } = useGetMovieReviewQuery({
    movieId: idMovie,
    userId: user?.id ?? "",
  });

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
    isReview(false);
    setReviewText("");
  }

  return (
    <ReviewContainer>
      <textarea
        placeholder="Add a review..."
        onChange={(event) => setReviewText(event.target.value)}
        value={reviewText}
      ></textarea>
      <div className="rowButtons">
        <AddReview
          onClick={() =>
            reviewApi ? handleEditReview() : handleCreateReview()
          }
        >
          {isLoadingCreateReview || isLoadingEditReview ? (
            <Spinner boxSize="1.5rem" />
          ) : reviewApi ? (
            "Edit review"
          ) : (
            "Create review"
          )}
        </AddReview>
        <CancelReview onClick={handleCancelReview}>Cancel</CancelReview>
      </div>
    </ReviewContainer>
  );
};
