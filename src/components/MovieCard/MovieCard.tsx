/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MovieContainer } from "./styles";
import Link from "next/link";
import NoImage from "@/assets/no-image.jpg";

export type MovieCardProps = {
  title: string;
  poster: string;
  score: number;
  idMovie: number;
};

export const MovieCard = ({
  title,
  poster,
  score,
  idMovie,
}: MovieCardProps) => {
  return (
    <Link href={`/movie/${idMovie}`} style={{ textDecoration: "none" }}>
      <MovieContainer>
        <img
          src={
            poster ? `https://image.tmdb.org/t/p/w342/${poster}` : NoImage.src
          }
          alt={title}
        />
        <div className="legend">
          <h3>{score.toFixed(2)}</h3>
          <p>{title}</p>
        </div>
      </MovieContainer>
    </Link>
  );
};
