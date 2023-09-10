import React from "react";
import { useGetMovieRecommendationsQuery } from "../../services/movieService";
import { RecommendationsContainer } from "./styles";
import { MovieCard } from "@/components";

export type RecommendationsProps = {
  idMovie: number;
  movieTitle: string;
};

export const Recommendations = ({
  idMovie,
  movieTitle,
}: RecommendationsProps) => {
  const { data: recommendations } = useGetMovieRecommendationsQuery(idMovie);

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
