import styled from "styled-components";
import { CommonButton } from "@/styles/globals";
import { motion } from "framer-motion";
import Link from "next/link";

export const DivSearch = styled.div`
  width: 23rem;
  height: 2.5rem;
  display: flex;
  gap: 1rem;

  input {
    height: 100%;
    width: 80%;
    background-color: white;
    padding: 10px;
    color: black;
    border: none;
    border-radius: 0.3rem;
  }

  button {
    width: 20%;
    border: none;
    cursor: pointer;
    color: white;
    height: 100%;
    font-weight: 700;
    background-color: #107ee5;
    border-radius: 0.4rem;
  }

  @media (max-width: 475px) {
    width: 75%;
    height: 30px;
    input {
      padding: 5px;
    }
  }
`;

export const HeaderRow = styled.header`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img {
    width: 100px;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    img {
      width: 85px;
      margin-bottom: 10px;
    }
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 475px) {
    width: 95%;
  }
`;

export const WatchlistButton = styled(CommonButton)`
  color: black;
  background-color: #05a6da;
`;

export const HeaderLink = styled(Link)<{ isSelected?: boolean }>`
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #107ee5;
  }

  color: ${({ isSelected }) => (isSelected ? "#107ee5" : "")};
`;

export const UserNav = styled(motion.nav)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
