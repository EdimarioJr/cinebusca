/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CastContainer, CastCards } from "./styles";
import NoImage from "@/assets/no-image.jpg";

import { CastPerson } from "@/models";

export type CastProps = {
  cast: CastPerson[];
};

export const Cast = ({ cast }: CastProps) => {
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
