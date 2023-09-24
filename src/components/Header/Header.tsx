import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { authService } from "@/services";
import { Container, CommonButton, Flex } from "@/styles/globals";

import CineBuscaLogo from "../../assets/cinebusca.png";

import { SearchButton } from "./SearchButton";
import { HeaderLink, HeaderRow, InputsRow, UserNav } from "./styles";

export type HeaderProps = {
  page?: "watchlist" | "review" | "feed";
};

export const Header = ({ page }: HeaderProps) => {
  const user = useUser();

  function handleLogout() {
    authService.logout();
  }

  return (
    <Container>
      <HeaderRow>
        <Flex style={{ gap: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image
              width={100}
              height={100}
              src={CineBuscaLogo as unknown as string}
              alt="logo cinebusca"
            />
          </Link>
        </Flex>

        <InputsRow>
          <SearchButton />
          {user ? (
            <UserNav key="nav" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeaderLink
                href="/feed"
                style={{ textDecoration: "none" }}
                $isSelected={page === "feed"}
              >
                <motion.h3 id="watch">Feed</motion.h3>
              </HeaderLink>
              <HeaderLink
                href="/watchlist"
                style={{ textDecoration: "none" }}
                $isSelected={page === "watchlist"}
              >
                <motion.h3 id="watch">Watchlist</motion.h3>
              </HeaderLink>
              <HeaderLink
                href="/reviews"
                style={{ textDecoration: "none" }}
                $isSelected={page === "review"}
              >
                <motion.h3 id="review">Reviews</motion.h3>
              </HeaderLink>
              <CommonButton onClick={handleLogout}>
                <RiLogoutCircleRLine fontSize="1.2rem" />
              </CommonButton>
            </UserNav>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <CommonButton>Sign in</CommonButton>
            </Link>
          )}
        </InputsRow>
      </HeaderRow>
    </Container>
  );
};
