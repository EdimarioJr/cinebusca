import React from "react";
import { Container, CommonButton, Flex } from "@/styles/globals";
import { HeaderLink, HeaderRow, InputsRow, UserNav } from "./styles";
import Link from "next/link";
import CineBuscaLogo from "../../assets/cinebusca.png";
import { authService } from "@/services";
import { motion } from "framer-motion";
import { SearchButton } from "./SearchButton";
import Image from "next/image";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useUser } from "@supabase/auth-helpers-react";

export type HeaderProps = {
  page?: "watchlist" | "review";
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
