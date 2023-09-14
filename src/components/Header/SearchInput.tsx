import React, { useState } from "react";
import { DivSearch } from "./styles";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { Input } from "@/styles/globals";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function submitSearch() {
    if (search) {
      router.push({
        pathname: "/search",
        query: { search },
      });
    }
  }

  return (
    <DivSearch>
      <Input
        type="text"
        placeholder="Search by film title"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={submitSearch}>
        <BsSearch fontSize="1.2rem" />
      </button>
    </DivSearch>
  );
};
