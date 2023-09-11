import React from "react";
import { ContainerPages, opacityAnimation } from "@/styles/globals";

import { Footer, Header, Loading, ReviewCard } from "@/components";
import { useUser } from "@supabase/auth-helpers-react";
import { useDeleteReviewMutation, useGetReviewsQuery } from "@/services";
import { toast } from "react-toastify";
import { ReviewsContainer } from "./styles";

export const ReviewsScreen = () => {
  const user = useUser();

  const { data: reviews, isLoading } = useGetReviewsQuery(
    {
      userId: user?.id ?? "",
    },
    { skip: !user }
  );
  const [deleteReview] = useDeleteReviewMutation();

  async function handleDeleteReview(id: string) {
    if (user) {
      try {
        await deleteReview({ id }).unwrap();
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
