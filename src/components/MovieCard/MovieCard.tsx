/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";

import NoImage from "@/assets/no-image.jpg";
import { Flex } from "@/styles/globals";

import { MovieContainer } from "./styles";
import { movieService } from "@/services";

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
}: MovieCardProps) => (
  <Link href={`/movie/${idMovie}`} style={{ textDecoration: "none" }}>
    <MovieContainer>
      <img
        src={poster ? movieService.getMovieImageUrl(poster) : NoImage.src}
        alt={title}
      />
      <div className="legend">
        <Flex style={{ gap: ".5rem" }}>
          <AiFillStar />
          <p className="score">{score.toFixed(2)}</p>
        </Flex>

        <p className="title">{title}</p>
      </div>
    </MovieContainer>
  </Link>
);
