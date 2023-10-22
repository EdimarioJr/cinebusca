import React from "react";

import { CommonButton } from "@/styles/globals";

import { ReviewContainer } from "./styles";
import { Spinner } from "..";
import { movieService } from "@/services";

export type ReviewCardProps = {
  id: string;
  review: string;
  deleteReview: (id: string) => void;
  handleEditReview: (id: string) => void;
  date: string;
  movieTitle: string;
  moviePoster: string;
  isLoadingDelete?: boolean;
};

export const ReviewCard = ({
  date,
  review,
  movieTitle,
  moviePoster,
  id,
  deleteReview,
  handleEditReview,
  isLoadingDelete = false,
}: ReviewCardProps) => (
  <ReviewContainer data-test="review-card">
    <img src={movieService.getMovieImageUrl(moviePoster)} alt="movie poster" />
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
        data-test="review-card-text"
      />
      <div className="actions">
        <CommonButton
          onClick={() => deleteReview(id)}
          style={{ backgroundColor: "#fc0349" }}
          data-test="delete-review-button"
        >
          {isLoadingDelete ? <Spinner boxSize="1.5rem" /> : "Delete Review"}
        </CommonButton>
        <CommonButton
          onClick={() => handleEditReview(id)}
          data-test="edit-review-button"
        >
          Edit Review
        </CommonButton>
      </div>
    </div>
  </ReviewContainer>
);
