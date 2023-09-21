import React, { useState } from "react";
import { opacityAnimation } from "@/styles/globals";

import { Loading, ReviewCard, ReviewModal } from "@/components";

import { ReviewsContainer } from "./styles";
import { useReview } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Review } from "@/models/review";

export const ReviewsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { isLoading, reviews, handleDeleteReview } = useReview();

  return (
    <MainLayout page="review">
      <ReviewsContainer
        initial="initial"
        animate="final"
        variants={opacityAnimation}
      >
        {!isLoading ? (
          reviews?.length !== 0 ? (
            reviews?.map((review) => {
              return (
                <ReviewCard
                  id={review.id}
                  movieTitle={review.movieTitle}
                  moviePoster={review.moviePoster}
                  movieId={review.movieId}
                  review={review.review}
                  date={String(review.date)}
                  deleteReview={handleDeleteReview}
                  handleEditReview={(id) => {
                    const review =
                      reviews.find((review) => review.id === id) ?? null;
                    setSelectedReview(review);

                    if (review) setIsOpen(true);
                  }}
                  key={review.id}
                />
              );
            })
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
      </ReviewsContainer>
    </MainLayout>
  );
};
