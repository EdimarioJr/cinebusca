/* eslint-disable @next/next/no-img-element */
import React from "react";

import NoImage from "@/assets/no-image.jpg";
import { CastPerson } from "@/models";

import { CastContainer, CastCards } from "./styles";

export type CastProps = {
  cast: CastPerson[];
};

export const Cast = ({ cast }: CastProps) => (
  <CastContainer>
    <h1>Cast</h1>
    <CastCards>
      {cast.map((actor, index) => (
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
      ))}
    </CastCards>
  </CastContainer>
);
