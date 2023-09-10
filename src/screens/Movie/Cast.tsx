/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { CastContainer, CastCards } from "./styles";
import NoImage from "@/assets/no-image.jpg";
import { useGetMovieCastQuery } from "@/services";

export type CastProps = {
  idMovie: number;
  putDirector: (name: string) => void;
};

export const Cast = ({ idMovie, putDirector }: CastProps) => {
  const { data } = useGetMovieCastQuery(idMovie);

  useEffect(() => {
    if (data)
      data?.crew.forEach((current) => {
        if (current.job === "Director") putDirector(current.name);
      });
  }, [idMovie, putDirector, data]);

  const cast = data?.cast ?? [];

  return (
    <CastContainer>
      <h1>Cast</h1>
      <CastCards>
        {cast.map((actor, index) => {
          return (
            <div className="actorCard" key={index}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
                    : NoImage.src
                }
                alt={actor.name}
              />
              <div className="actor-description">
                <p>
                  <b>{actor.name}</b> as <b>{actor.character}</b>
                </p>
              </div>
            </div>
          );
        })}
      </CastCards>
    </CastContainer>
  );
};
