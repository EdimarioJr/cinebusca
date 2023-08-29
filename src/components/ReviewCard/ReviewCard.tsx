import React, { useState, useEffect } from "react";
import MovieData from "@/services/movieApi";
import dbAPI from "@/services/dbApi";
import auth from "@/services/auth";
import { CommonButton } from "@/styles/globals";
import { ReviewContainer } from "./styles";
import { useRouter } from "next/router";

export type ReviewCardProps = {
  idMovie: number;
  review: string;
  deleteReview: (id: number) => void;
  date: string;
  exit: Record<string, any>;
};

export const ReviewCard = ({
  idMovie,
  date,
  review,
  deleteReview,
}: ReviewCardProps) => {
  const [movie, setMovie] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await MovieData.getMovie(idMovie).then((response) => setMovie(response));
    })();
  }, [idMovie]);

  async function handleDelete() {
    if (auth.isAuthenticated()) {
      const response = await dbAPI.delete("/reviews", {
        params: {
          idMovie,
        },
      });
      if (response.data.review) deleteReview(idMovie);
      else {
        // if the token expires will enter in this else
        alert(response.data.message);
        auth.logout();
        router.push("/");
      }
    } else {
      // if there is no token in the sessionStorage
      alert("You don't have the permission to do this!");
      router.push("/login");
    }
  }

  return (
    <>
      <ReviewContainer>
        <img
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt="movie poster"
        />
        <div className="movieInfo">
          <h3>{movie.original_title}</h3>
          <h4>{date.slice(0, 10)}</h4>
          <p>{review}</p>
          <CommonButton onClick={handleDelete}>Delete review</CommonButton>
        </div>
      </ReviewContainer>
    </>
  );
};
