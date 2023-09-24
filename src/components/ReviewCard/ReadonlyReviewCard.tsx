import React from "react";

import { ReviewContainer } from "./styles";

export type ReadonlyReviewCardProps = {
  review: string;
  movieTitle: string;
  moviePoster: string;
  date: Date;
};

export const ReadonlyReviewCard = ({
  review,
  movieTitle,
  moviePoster,
  date,
}: ReadonlyReviewCardProps) => (
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
    </div>
  </ReviewContainer>
);
