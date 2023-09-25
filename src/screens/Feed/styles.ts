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
    margin-bottom: 1.9rem;
  }

  .user-notification {
    position: relative;
  }

  .username {
    position: relative;
    z-index: 1;
    color: white;
    margin-bottom: 1.9rem;
    span {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .feed {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
