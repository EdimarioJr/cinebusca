import React from "react";
import { opacityAnimation } from "@/styles/globals";

import { Loading, ReviewCard } from "@/components";

import { ReviewsContainer } from "./styles";
import { useReview } from "@/hooks";
import { MainLayout } from "@/layouts";

export const ReviewsScreen = () => {
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
      </ReviewsContainer>
    </MainLayout>
  );
};
