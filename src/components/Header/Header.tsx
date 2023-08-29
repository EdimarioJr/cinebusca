import React, { useState } from "react";
import { Container, CommonButton } from "@/styles/globals";
import { HeaderRow, InputsRow, UserNav } from "./styles";
import Link from "next/link";
import CineBuscaLogo from "../../assets/cinebusca.png";
import auth from "@/services/auth";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";

export type HeaderProps = {
  watchlist?: boolean;
  review?: boolean;
};

export const Header = ({ watchlist, review }: HeaderProps) => {
  const [isLogged, setIsLogged] = useState(auth.isAuthenticated());

  function handleLogout() {
    auth.logout();
    setIsLogged(false);
  }

  return (
    <Container>
      <HeaderRow>
        <Link href="/" style={{ textDecoration: "none" }}>
          <img src={CineBuscaLogo as unknown as string} alt="logo cinebusca" />
        </Link>
        <InputsRow>
          <SearchInput />
          {isLogged ? (
            <CommonButton onClick={handleLogout}>Logout</CommonButton>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <CommonButton>Sign in</CommonButton>
            </Link>
          )}
        </InputsRow>
      </HeaderRow>
      <AnimatePresence>
        {isLogged && (
          <UserNav
            key="nav"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            $watchlist={watchlist}
            $review={review}
          >
            <Link href="/watchlist" style={{ textDecoration: "none" }}>
              <motion.h3 id="watch">WATCHLIST</motion.h3>
            </Link>
            <Link href="/reviews" style={{ textDecoration: "none" }}>
              <motion.h3 id="review">REVIEWS</motion.h3>
            </Link>
          </UserNav>
        )}
      </AnimatePresence>
    </Container>
  );
};
