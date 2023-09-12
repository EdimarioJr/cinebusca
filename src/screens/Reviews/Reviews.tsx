import React from "react";
import { ContainerPages, opacityAnimation } from "@/styles/globals";

import { Footer, Header, Loading, ReviewCard } from "@/components";

import { ReviewsContainer } from "./styles";
import { useReview } from "@/hooks";

export const ReviewsScreen = () => {
  const { isLoading, reviews, handleDeleteReview } = useReview();

  return (
    <>
      <Header review />
      <ContainerPages>
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
      </ContainerPages>
      <Footer />
    </>
  );
};
