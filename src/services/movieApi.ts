import { CastPerson, Crew, MovieDetails, MovieImage } from "@/models";
import { Movie } from "@/models/movie";
import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
  },
});

console.log(process.env.MOVIE_API_KEY);

class MovieService {
  async getPopularMovies(page?: number): Promise<Movie[]> {
    if (page) {
      const response = await movieApi.get(`movie/popular?page=${page}`);
      return response.data.results ?? [];
    } else {
      const response = await movieApi.get(`movie/popular`);
      return response.data.results ?? [];
    }
  }

  async getMovie(idMovie: number): Promise<MovieDetails> {
    const response = await movieApi.get(`movie/${idMovie}`);

    return response.data;
  }

  async getMovieCast(
    idMovie: string
  ): Promise<{ cast: CastPerson[]; crew: Crew[] }> {
    const response = await movieApi.get(`movie/${idMovie}/credits`);

    return response.data;
  }

  async getMovieRecommendations(idMovie: number): Promise<Movie[]> {
    const response = await movieApi.get(`movie/${idMovie}/recommendations`);

    return response.data.results;
  }

  async getMovieImages(idMovie: string): Promise<{
    backdrops: MovieImage[];
    posters: MovieImage[];
    logos: MovieImage[];
  }> {
    const response = await movieApi.get(`movie/${idMovie}/images`);
    return response.data;
  }

  async searchMovie(query: string, page: number) {
    const response = await movieApi.get(
      `search/movie?query=${query}&page=${page}`
    );
    return response.data;
  }
}

const movieService = new MovieService();
export default movieService;
