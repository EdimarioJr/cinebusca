import styled from "styled-components";
import { CommonButton } from "@/styles/globals";
import { motion } from "framer-motion";
import Link from "next/link";

export const HeaderRow = styled.header`
  margin: 0.625rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img {
    width: 6.25rem;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    img {
      width: 5.32rem;
      margin-bottom: 0.625rem;
    }
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: 475px) {
    width: 95%;
  }
`;

export const WatchlistButton = styled(CommonButton)`
  color: black;
  background-color: ${(props) => props.theme.colors.quaternary};
`;

export const HeaderLink = styled(Link)<{ $isSelected?: boolean }>`
  color: white;
  padding: 0.625rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  color: ${({ $isSelected, ...props }) =>
    $isSelected ? props.theme.colors.primary : ""};
`;

export const UserNav = styled(motion.nav)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
