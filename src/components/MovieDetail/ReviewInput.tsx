import React, { useState, useEffect } from "react";
import dbAPI from "@/services/dbApi";
import auth from "@/services/auth";
import { ReviewContainer, AddReview, CancelReview } from "./styles";
import { useRouter } from "next/router";

export type ReviewInputProps = {
  idMovie: number;
  isReview: (value: boolean) => void;
};

export const ReviewInput = ({ idMovie, isReview }: ReviewInputProps) => {
  const [review, setReview] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated()) {
        dbAPI.get("/reviews").then((response) => {
          const { reviews, message } = response.data;
          // if reviews!== true, it means that the auth in the DB have failed (this happens when the token expires)
          // if there is no review, the DB will return an empty Array
          if (reviews) {
            if (reviews.length !== 0)
              reviews.forEach((review: any) => {
                if (review.idMovie === idMovie) setReview(review.review);
              });
          } else {
            alert(message);
            auth.logout();
            router.push("/");
          }
        });
      }
    })();
  }, [idMovie, router]);

  async function handleAddReview() {
    if (auth.isAuthenticated()) {
      await dbAPI.post("/reviews", { idMovie, review }).then((response) => {
        const { message, review } = response.data;
        alert(message);
        // if the operation was not succesful, will redirect to the homepage
        if (!review) router.push("/");
      });
    } else {
      alert("Login to perform this operation!");
      router.push("/");
    }
  }

  function handleCancelReview() {
    isReview(false);
    setReview("");
  }
  return (
    <ReviewContainer>
      <textarea
        placeholder="Add a review..."
        onChange={(event) => setReview(event.target.value)}
        value={review}
      ></textarea>
      <div className="rowButtons">
        <AddReview onClick={handleAddReview}>Add Review</AddReview>
        <CancelReview onClick={handleCancelReview}>Cancel</CancelReview>
      </div>
    </ReviewContainer>
  );
};
