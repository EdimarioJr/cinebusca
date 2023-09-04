/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { CastContainer, CastCards } from "./styles";
import NoImage from "@/assets/no-image.jpg";
import MovieData from "@/services/movieApi";
import { CastPerson } from "@/models";

export type CastProps = {
  idMovie: number;
  putDirector: (name: string) => void;
};

export const Cast = ({ idMovie, putDirector }: CastProps) => {
  const [cast, setCast] = useState([] as CastPerson[]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await MovieData.getMovieCast(idMovie).then((response) => {
        if (isMounted) {
          setCast(response.cast);

          response.crew.forEach((current) => {
            if (current.job === "Director") putDirector(current.name);
          });
        }
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [idMovie, putDirector]);

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
