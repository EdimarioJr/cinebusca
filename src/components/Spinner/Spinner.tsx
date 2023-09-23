import React from "react";
import { StyledSpinnerCircle, StyledSpinnerContainer } from "./styles";

export const Spinner = ({ boxSize = "3rem" }: { boxSize?: string }) => {
  return (
    <StyledSpinnerContainer $boxSize={boxSize}>
      <StyledSpinnerCircle
        $boxSize={boxSize}
        animate={{ rotate: 360 }}
        transition={{
          ease: "linear",
          duration: 1,
          repeat: Infinity,
        }}
      />
    </StyledSpinnerContainer>
  );
};
