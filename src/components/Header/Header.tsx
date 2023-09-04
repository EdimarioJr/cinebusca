import React, { useEffect, useState } from "react";
import { Container, CommonButton } from "@/styles/globals";
import { HeaderRow, InputsRow, UserNav } from "./styles";
import Link from "next/link";
import CineBuscaLogo from "../../assets/cinebusca.png";
import { authService } from "@/services/auth";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

export type HeaderProps = {
  watchlist?: boolean;
  review?: boolean;
};

export const Header = ({ watchlist, review }: HeaderProps) => {
  const user = useUser();

  function handleLogout() {
    authService.logout();
  }

  return (
    <Container>
      <HeaderRow>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Image
            width={100}
            height={100}
            src={CineBuscaLogo as unknown as string}
            alt="logo cinebusca"
          />
        </Link>
        <InputsRow>
          <SearchInput />
          {user ? (
            <CommonButton onClick={handleLogout}>Logout</CommonButton>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <CommonButton>Sign in</CommonButton>
            </Link>
          )}
        </InputsRow>
      </HeaderRow>
      <AnimatePresence>
        {user && (
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
