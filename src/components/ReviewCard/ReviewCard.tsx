import React, { useState, useEffect } from "react";
import MovieData from "@/services/movieApi";

import { CommonButton } from "@/styles/globals";
import { ReviewContainer } from "./styles";

export type ReviewCardProps = {
  idMovie: number;
  id: string;
  review: string;
  deleteReview: (id: string) => void;
  date: string;
};

export const ReviewCard = ({
  idMovie,
  date,
  review,
  id,
  deleteReview,
}: ReviewCardProps) => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    (async () => {
      await MovieData.getMovie(idMovie).then((response) => setMovie(response));
    })();
  }, [idMovie]);

  return (
    <>
      {movie && (
        <ReviewContainer>
          <img
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt="movie poster"
          />
          <div className="movieInfo">
            <h3>{movie.original_title}</h3>
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
