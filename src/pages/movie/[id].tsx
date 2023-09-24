import { useRouter } from "next/router";
import React from "react";

import { MovieScreen } from "@/screens";

const Movie = () => {
  const { query } = useRouter();

  return <MovieScreen id={Number(query.id)} />;
};

export default Movie;
