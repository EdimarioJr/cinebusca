import React, { useState, useEffect } from "react";
import { ContainerPages, opacityAnimation } from "@/styles/globals";
import dbAPI from "@/services/dbApi";
import auth from "@/services/auth";

import { ReviewsContainer } from "./styles";
import { useRouter } from "next/router";
import { Footer, Header, Loading, ReviewCard } from "@/components";

export const Reviews = () => {
  const [reviews, setReviews] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (auth.isAuthenticated()) {
        setIsLoading(true);
        await dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          if (reviews) {
            if (isMounted) {
              setReviews(reviews);
              setIsLoading(false);
            }
          } else {
            auth.logout();
            alert(message);
            router.push("/");
          }
        });
      }
    })();
  }, [router]);

  // updating the reviews state after a delete
  function handleDeleteReview(id: number) {
    const newReviews = reviews.filter((current) => {
      return current.idMovie !== id;
    });
    setReviews(newReviews);
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
              reviews.map((review, index) => {
                return (
                  <ReviewCard
                    exit={{ opacity: 0 }}
                    idMovie={review.idMovie}
                    review={review.review}
                    date={String(review.date)}
                    deleteReview={handleDeleteReview}
                    key={index}
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
