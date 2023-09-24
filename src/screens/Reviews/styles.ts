import { motion } from "framer-motion";
import styled from "styled-components";

export const ReviewContainer = styled.section`
  h1 {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.xl};
    margin-bottom: 3rem;
  }
`;

export const ReviewsGrid = styled(motion.section)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25rem;
  color: white;
  padding: 0;
  margin: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
