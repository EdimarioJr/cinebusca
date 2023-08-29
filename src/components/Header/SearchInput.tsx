import React, { useState } from "react";
import { DivSearch } from "./styles";
import { useRouter } from "next/router";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function submitSearch() {
    if (search) {
      // redirects to the search page with the query that the page will resolve
      router.push({
        pathname: "/search",
        search: search,
      });
    } else alert("The search is empty!");
  }

  return (
    <DivSearch>
      <input
        type="text"
        placeholder="Search by film title"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={submitSearch}>Go!</button>
    </DivSearch>
  );
};
