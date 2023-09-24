import { useRouter } from "next/router";
import React from "react";
import { BsSearch } from "react-icons/bs";

import { CommonButton } from "@/styles/globals";

export const SearchButton = () => {
  const router = useRouter();

  function goToSearch() {
    router.push({
      pathname: "/search",
    });
  }

  return (
    <CommonButton onClick={goToSearch}>
      <BsSearch fontSize="1.2rem" />
    </CommonButton>
  );
};
