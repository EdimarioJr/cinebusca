import styled from "styled-components";
import { motion } from "framer-motion";

export const ReviewsContainer = styled(motion.section)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25rem;
  color: white;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
