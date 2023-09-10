import { CastPerson, Crew, MovieDetails, MovieImage } from "@/models";
import { Movie } from "@/models/movie";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { CarouselMovieImage } from "@/components";
import { toast } from "react-toastify";

export type MovieImagesResponse = {
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
};

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
    },
  }),
  {
    maxRetries: 5,
  }
);

export const movieService = createApi({
  reducerPath: "movieService",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<Movie[], number>({
      query: (page) => `movie/popular?page=${page}`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getPopularMovieImages: builder.query<CarouselMovieImage[], void>({
      query: () => `movie/popular?page=1`,
      transformResponse: (response: { results: Movie[] }) =>
        response.results.map((movie) => ({
          src: `https://image.tmdb.org/t/p/w342/${
            movie.poster_path ? movie.poster_path : movie.backdrop_path
          }`,
          alt: movie.original_title,
          link: `/movie/${movie.id}`,
        })),
    }),
    getMovie: builder.query<MovieDetails, number>({
      query: (id) => `movie/${id}`,
      transformResponse: (response: MovieDetails) => response,
    }),
    getMovieCast: builder.query<{ cast: CastPerson[]; crew: Crew[] }, number>({
      query: (id) => `movie/${id}/credits`,
      transformResponse: (response: { cast: CastPerson[]; crew: Crew[] }) =>
        response,
    }),
    getMovieRecommendations: builder.query<Movie[], number>({
      query: (id) => `movie/${id}/recommendations`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getMovieImages: builder.query<MovieImagesResponse, number>({
      query: (id) => `movie/${id}/images`,
      transformResponse: (response: MovieImagesResponse) => ({
        backdrops: response.backdrops.slice(0, 5),
        posters: response.posters.slice(0, 5),
        logos: response.logos.slice(0, 5),
      }),
    }),
    searchMovie: builder.query<
      { results: Movie[]; total_pages: number },
      { query: string; page: number }
    >({
      query: ({ query, page }) => `search/movie?query=${query}&page=${page}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetPopularMovieImagesQuery,
  useGetMovieCastQuery,
  useGetMovieImagesQuery,
  useGetMovieRecommendationsQuery,
  useGetMovieQuery,
  useSearchMovieQuery,
  useLazySearchMovieQuery,
} = movieService;
