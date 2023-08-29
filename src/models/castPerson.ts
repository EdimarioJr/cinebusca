import { MoviePerson } from "./moviePerson";

export type CastPerson = MoviePerson & {
  cast_id: number;
  character: string;
  order: number;
};
