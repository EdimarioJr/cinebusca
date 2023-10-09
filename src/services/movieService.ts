import { CastPerson, Crew, MovieDetails, MovieImage } from "@/models";
import { Movie } from "@/models/movie";
import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
  },
});

class MovieService {
  async getPopularMovies(page?: number): Promise<Movie[]> {
    const response = await movieApi.get(`movie/popular?page=${page}`);
    return response.data.results ?? [];
  }

  async getMovie(idMovie: number): Promise<MovieDetails> {
    const response = await movieApi.get(`movie/${idMovie}`);

    return response.data;
  }

  async getMovieCast(
    id: number
  ): Promise<{ cast: CastPerson[]; crew: Crew[] }> {
    const response = await movieApi.get(`movie/${id}/credits`);

    return response.data;
  }

  async getMovieRecommendations(id: number): Promise<Movie[]> {
    const response = await movieApi.get(`movie/${id}/recommendations`);

    return response.data.results;
  }

  async getMovieImages(id: number): Promise<{
    backdrops: MovieImage[];
    posters: MovieImage[];
    logos: MovieImage[];
  }> {
    const response = await movieApi.get(`movie/${id}/images`);

    return {
      backdrops: response.data.backdrops.slice(0, 5),
      posters: response.data.posters.slice(0, 5),
      logos: response.data.logos.slice(0, 5),
    };
  }

  async searchMovie(query: string, page: number) {
    const response = await movieApi.get(
      `search/movie?query=${query}&page=${page}`
    );
    return response.data;
  }
}

export const movieService = new MovieService();
