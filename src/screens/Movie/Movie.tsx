import React, { useState, useEffect } from "react";
import MovieData from "@/services/movieApi";
import { Gallery } from "./styles";
import { ContainerPages } from "@/styles/globals";
import {
  CineCarousel,
  Footer,
  Header,
  Loading,
  MovieDetail,
} from "@/components";
import { Cast } from "./Cast";
import { Recommendations } from "./Recommendations";
import { MovieDetails } from "@/models";

export type MovieProps = {
  id: string;
};

export const Movie = (props: any) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [director, setDirector] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const idMovie = props.match.params.id;

  useEffect(() => {
    (async () => {
      // everytimes the movie is changed , will scroll to the top,fetch the data from the new movie and render the
      // loading component
      window.addEventListener("resize", handleResize);
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await MovieData.getMovie(idMovie).then((response) => {
        setMovie(response);
        setIsLoading(false);
      });
    })();

    return () => window.removeEventListener("resize", handleResize);
  }, [idMovie]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  return (
    <>
      <Header />
      <ContainerPages>
        {!isLoading ? (
          movie ? (
            <>
              <MovieDetail {...{ director, ...movie }} />
              <Cast putDirector={setDirector} idMovie={idMovie} />
              {windowWidth >= 768 ? (
                <Gallery>
                  <CineCarousel idMovie={idMovie} />
                </Gallery>
              ) : (
                ""
              )}

              <Recommendations
                idMovie={idMovie}
                movieTitle={movie.original_title}
              />
            </>
          ) : (
            ""
          )
        ) : (
          <Loading />
        )}
      </ContainerPages>
      <Footer />
    </>
  );
};
