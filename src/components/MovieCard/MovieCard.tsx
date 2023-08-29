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
    <Link href={`/Movie/${idMovie}`} style={{ textDecoration: "none" }}>
      <MovieContainer>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w342/${poster}`
              : (NoImage as unknown as string)
          }
          alt={title}
        />
        <div className="legend">
          <h3>{score}</h3>
          <p>{title}</p>
        </div>
      </MovieContainer>
    </Link>
  );
};
