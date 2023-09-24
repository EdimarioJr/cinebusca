import { motion } from "framer-motion";
import { styled } from "styled-components";

export const FeedContainer = styled.section`
  h1 {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.xl};
    margin-bottom: 3rem;
  }
`;

export const UpdatesContainer = styled(motion.section)`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .feed {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
