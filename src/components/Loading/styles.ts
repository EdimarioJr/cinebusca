import styled from "styled-components";
import { motion } from "framer-motion";

export const Ball = styled(motion.span)`
  display: block;
  background-color: white;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 1.25rem;
  margin-right: 0.625rem;
`;

export const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1.25rem 0;
`;
