import styled from "styled-components";
import { motion } from "framer-motion";

export const ReviewContainer = styled(motion.section)`
  width: 100%;
  height: 21.875rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.625rem;

  img {
    height: inherit;
    width: 100%;
  }

  .movieInfo {
    overflow: auto;
    color: white;
    padding: 0 1rem;
    padding-bottom: 0.625rem;
    background-color: #383d48;
    display: flex;
    flex-direction: column;
    height: 100%;

    h3 {
      margin-top: 1.2rem;
      margin-bottom: 5px;
    }

    h4 {
      font-weight: 300;
      margin-bottom: 1.2rem;
    }

    p {
      flex: 1;
      font-weight: 500;
      overflow: auto;
      margin-bottom: 0.625rem;
    }

    .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media (max-width: 767px) {
    height: 250px;
  }
`;
