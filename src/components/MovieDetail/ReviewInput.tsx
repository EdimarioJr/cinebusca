import React, { useState, useEffect } from "react";

import { ReviewContainer, AddReview, CancelReview } from "./styles";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import { reviewService } from "@/services";
import { Review } from "@/models/review";
import { Loading, Spinner } from "..";

export type ReviewInputProps = {
  idMovie: number;
  isReview: (value: boolean) => void;
};

export const ReviewInput = ({ idMovie, isReview }: ReviewInputProps) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewApi, setReviewApi] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const reviewApi = await reviewService.getMovieReview({
            userId: user.id,
            movieId: idMovie,
          });
          if (reviewApi) {
            setReviewText(reviewApi.review);
            setReviewApi(reviewApi);
          }
        } catch (err) {
          toast.error(`Error fetching the review: ${err} `);
        }
      }
    })();
  }, [idMovie, router, user]);

  async function handleCreateReview() {
    if (user) {
      setLoading(true);
      try {
        const newReview = await reviewService.createReview({
          user: user.id,
          movieId: idMovie,
          review: reviewText,
          date: new Date().toISOString(),
        });
        setReviewApi(newReview);
        toast.success("Success on creating the review!");
      } catch {
        toast.error("Creating Review error!");
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleEditReview() {
    if (user && reviewApi) {
      setLoading(true);
      try {
        await reviewService.editReview({
          id: reviewApi.id,
          review: reviewText,
          date: new Date().toISOString(),
        });
        toast.success("Success on editing the review!");
      } catch {
        toast.error("Editing Review error!");
      } finally {
        setLoading(false);
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
          {loading ? (
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
