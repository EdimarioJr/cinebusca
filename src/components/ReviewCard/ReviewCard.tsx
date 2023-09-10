import React from "react";

import { CommonButton } from "@/styles/globals";
import { ReviewContainer } from "./styles";

export type ReviewCardProps = {
  id: string;
  review: string;
  deleteReview: (id: string) => void;
  date: string;
  movieTitle: string;
  moviePoster: string;
};

export const ReviewCard = ({
  date,
  review,
  movieTitle,
  moviePoster,
  id,
  deleteReview,
}: ReviewCardProps) => {
  return (
    <>
      {movieTitle && (
        <ReviewContainer>
          <img
            src={`https://image.tmdb.org/t/p/w185/${moviePoster}`}
            alt="movie poster"
          />
          <div className="movieInfo">
            <h3>{movieTitle}</h3>
            <h4>{new Date(date).toLocaleDateString("pt-BR")}</h4>
            <p>{review}</p>
            <CommonButton onClick={() => deleteReview(id)}>
              Delete review
            </CommonButton>
          </div>
        </ReviewContainer>
      )}
    </>
  );
};
