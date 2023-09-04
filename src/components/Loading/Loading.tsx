import React from "react";
import { Ball, LoadingContainer } from "./styles";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.4,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

// the animation of the children
const loadingBallVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

// the animation will always repeat
const loadingBallTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

export const Loading = () => {
  return (
    <>
      <LoadingContainer
        initial="start"
        animate="end"
        variants={loadingContainerVariants}
      >
        <Ball
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
        <Ball
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
        <Ball
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
      </LoadingContainer>
    </>
  );
};
