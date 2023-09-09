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
      if (user) {
        setIsLoading(true);
        const reviews = await reviewService.getUserReviews({
          userId: user.id,
        });

        if (reviews) {
          setReviews(reviews);
          setIsLoading(false);
        }
      }
    })();
  }, [user]);

  async function handleDeleteReview(id: string) {
    if (user) {
      try {
        await reviewService.deleteReview({ id });
        const newReviews = [...reviews].filter((review) => review.id !== id);
        setReviews(newReviews);
        toast.success("Review deleted!");
      } catch (err) {
        toast.error("Error deleting the review");
      }
    }
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
