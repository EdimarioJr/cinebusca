import { MovieScreen } from "@/screens";
import { useRouter } from "next/router";
import React from "react";

const Movie = () => {
  const { query } = useRouter();

  return <MovieScreen id={Number(query.id)} />;
};

export default Movie;
