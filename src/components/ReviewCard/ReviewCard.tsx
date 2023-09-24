import React from "react";

import { CommonButton } from "@/styles/globals";

import { ReviewContainer } from "./styles";

export type ReviewCardProps = {
  id: string;
  review: string;
  deleteReview: (id: string) => void;
  handleEditReview: (id: string) => void;
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
  handleEditReview,
}: ReviewCardProps) => (
  <ReviewContainer>
    <img
      src={`https://image.tmdb.org/t/p/w185/${moviePoster}`}
      alt="movie poster"
    />
    <div className="movieInfo">
      <h3>{movieTitle}</h3>
      <h4>{new Date(date).toLocaleDateString("pt-BR")}</h4>
      <textarea
        disabled={true}
        value={review}
        style={{
          height: "100%",
          border: "none",
          background: "transparent",
          color: "white",
          resize: "none",
          marginBottom: "2rem",
        }}
      />
      <div className="actions">
        <CommonButton
          onClick={() => deleteReview(id)}
          style={{ backgroundColor: "#fc0349" }}
        >
          Delete review
        </CommonButton>
        <CommonButton onClick={() => handleEditReview(id)}>
          Edit Review
        </CommonButton>
      </div>
    </div>
  </ReviewContainer>
);
