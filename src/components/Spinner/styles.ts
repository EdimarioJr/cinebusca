import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledSpinnerContainer = styled("div")<{ $boxSize?: string }>`
  width: ${(props) => props.$boxSize ?? "3rem"};
  height: ${(props) => props.$boxSize ?? "3rem"};
  position: relative;
`;

export const StyledSpinnerCircle = styled(motion.span)<{ $boxSize?: string }>`
  display: block;
  width: ${(props) => props.$boxSize ?? "3rem"};
  height: ${(props) => props.$boxSize ?? "3rem"};
  border: 3px solid;
  border-color: ${(props) => props.theme.colors.secondary};
  border-top: 3px solid;
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
`;
