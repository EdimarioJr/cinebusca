import React, { useState, useEffect } from "react";
import MovieData from "../../services/movieApi";
import { RecommendationsContainer } from "./styles";
import { MovieCard } from "@/components";
import { Movie } from "@/models";

export type RecommendationsProps = {
  idMovie: number;
  movieTitle: string;
};

export const Recommendations = ({
  idMovie,
  movieTitle,
}: RecommendationsProps) => {
  const [recommendations, setRecommendations] = useState([] as Movie[]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await MovieData.getMovieRecommendations(idMovie).then((response) => {
        if (isMounted) setRecommendations(response);
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [idMovie]);

  return (
    <RecommendationsContainer>
      <h1>
        If you like <span>{movieTitle}</span>, you would like these...
      </h1>
      <div className="recommendation-grid">
        {recommendations
          ? recommendations.slice(0, 8).map((movie, index) => {
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
            })
          : ""}
      </div>
    </RecommendationsContainer>
  );
};
