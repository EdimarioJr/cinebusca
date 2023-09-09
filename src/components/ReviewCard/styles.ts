import styled from "styled-components";
import { motion } from "framer-motion";

export const ReviewContainer = styled(motion.section)`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;

  img {
    height: inherit;
    width: 100%;
  }

  .movieInfo {
    overflow: auto;
    color: white;
    padding: 0 15px;
    padding-bottom: 10px;
    background-color: #383d48;
    display: flex;
    flex-direction: column;
    height: 100%;

    h3 {
      margin-top: 20px;
      margin-bottom: 5px;
    }

    h4 {
      font-weight: 300;
      margin-bottom: 20px;
    }

    p {
      flex: 1;
      font-weight: 500;
      overflow: auto;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 767px) {
    height: 250px;
  }
`;
