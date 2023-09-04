import React, { useState, useEffect } from "react";
import { ContainerPages, opacityAnimation } from "@/styles/globals";

import { Footer, Header, Loading, ReviewCard } from "@/components";
import { useUser } from "@supabase/auth-helpers-react";
import { reviewService } from "@/services";
import { toast } from "react-toastify";
import { ReviewsContainer } from "./styles";

export const ReviewsScreen = () => {
  const [reviews, setReviews] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();

  useEffect(() => {
    (async () => {
      getUserReviews();
    })();
  }, []);

  async function getUserReviews() {
    if (user) {
      setIsLoading(true);
      await reviewService
        .getUserReviews({ userId: user.id })
        .then((response) => {
          const reviews = response;
          if (reviews) {
            setReviews(reviews);
            setIsLoading(false);
          }
        });
    }
  }

  async function handleDeleteReview(id: string) {
    if (user) {
      try {
        await reviewService.deleteReview({ id });
        getUserReviews();
        toast.success("Review deleted!");
      } catch (err) {
        toast.error("Error deleting the review");
      }
    }

    getUserReviews();
  }

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
            reviews.length !== 0 ? (
              reviews.map((review) => {
                return (
                  <ReviewCard
                    id={review.id}
                    idMovie={review.movieId}
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
