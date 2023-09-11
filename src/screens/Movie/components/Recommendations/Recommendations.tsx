import React from "react";
import { RecommendationsContainer } from "./styles";
import { MovieCard } from "@/components";
import { Movie } from "@/models";

export type RecommendationsProps = {
  movieTitle: string;
  recommendations: Movie[];
};

export const Recommendations = ({
  recommendations,
  movieTitle,
}: RecommendationsProps) => {
  return (
    <RecommendationsContainer>
      {recommendations?.length ? (
        <>
          <h1>
            If you like <span>{movieTitle}</span>, you would like these...
          </h1>
          <div className="recommendation-grid">
            {recommendations.slice(0, 12).map((movie, index) => {
              const { id, original_title, vote_average, poster_path } = movie;
              return (
                <MovieCard
                  idMovie={id}
                  title={original_title}
                  score={vote_average}
                  poster={poster_path}
                  key={index}
                />
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </RecommendationsContainer>
  );
};
