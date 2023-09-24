import { motion } from "framer-motion";
import styled from "styled-components";

import { CommonButton } from "@/styles/globals";

export const WatchlistContainer = styled(motion.section)`
  h1 {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.xl};
    margin-bottom: 3rem;
  }
`;

export const WatchlistGrid = styled(motion.section)`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 1.875rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 1.875rem;
    transition: all 0.5s;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 758px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.6125rem;
    }
  }
  @media (min-width: 759px) and (max-width: 1013px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export const RemoveButton = styled(CommonButton)<{ id: string }>`
  margin-top: 0.6125rem;
  background-color: ${(props) => props.theme.colors.danger};
  border-radius: ${(props) => props.theme.borderRadius.md};

  @media (max-width: 475px) {
    width: 10.3125rem;
  }

  @media (min-width: 476px) and (max-width: 1109px) {
    width: 14.375rem;
  }

  @media (min-width: 1110px) and (max-width: 1320px) {
    width: 16.25rem;
  }
`;
