import React, { useState } from "react";

import { Loading, ReviewCard, ReviewModal } from "@/components";
import { useReview } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Review } from "@/models/review";
import { opacityAnimation } from "@/styles/globals";

import { ReviewContainer, ReviewsGrid } from "./styles";

export const ReviewsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const {
    isLoading,
    reviews,
    handleDeleteReview,
    isLoadingDelete,
    idReviewToBeDeleted,
  } = useReview();

  return (
    <MainLayout page="review">
      <ReviewContainer>
        <h1>My Reviews</h1>
        <ReviewsGrid
          initial="initial"
          animate="final"
          variants={opacityAnimation}
        >
          {!isLoading ? (
            reviews?.length !== 0 ? (
              reviews?.map((review) => (
                <ReviewCard
                  id={review.id}
                  movieTitle={review.movieTitle}
                  moviePoster={review.moviePoster}
                  review={review.review}
                  date={String(review.date)}
                  deleteReview={handleDeleteReview}
                  isLoadingDelete={
                    isLoadingDelete && idReviewToBeDeleted === review.id
                  }
                  handleEditReview={(id) => {
                    const review =
                      reviews.find((review) => review.id === id) ?? null;
                    setSelectedReview(review);

                    if (review) setIsOpen(true);
                  }}
                  key={review.id}
                />
              ))
            ) : (
              <h1>No reviews</h1>
            )
          ) : (
            <Loading />
          )}
          {selectedReview && (
            <ReviewModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              id={selectedReview.movieId}
              poster_path={selectedReview.moviePoster}
              title={selectedReview.movieTitle}
            />
          )}
        </ReviewsGrid>
      </ReviewContainer>
    </MainLayout>
  );
};
