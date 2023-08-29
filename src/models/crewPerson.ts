import { MoviePerson } from "./moviePerson";

export type Crew = MoviePerson & {
  department: string;
  job: string;
};
