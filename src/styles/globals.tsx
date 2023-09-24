import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    height: 100%;
    min-height: 100%;
  }

  body {
    background-color: ${(props) => props.theme.colors.secondary};
    font-family: var(--raleway), sans-serif;
    font-size: ${(props) => props.theme.fontSizes.md};
    height: 100%;
    min-height: 100%;
  }

  input {
    font-family: var(--raleway), sans-serif;
  }

  textarea {
    font-family: var(--raleway), sans-serif;
    font-size: ${(props) => props.theme.fontSizes.md};
  }

  @media(max-width: 475px){
    body{
      font-size: ${(props) => props.theme.fontSizes.xs};
    }
      
    }


  ::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 3rem;
  }

  ::-webkit-scrollbar-track {
    border:solid 1px transparent;
    border-radius: ${(props) => props.theme.fontSizes.lg};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: ${(props) => props.theme.fontSizes.lg};
  }
`;

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;

  @media (max-width: 1152px) {
    width: 95%;
  }
`;

export const ContainerPages = styled(Container)`
  min-height: calc(100vh - 345px);
`;

export const Flex = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FlexRowBetween = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GridCenter = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-content: center;
`;

export const CommonButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 0 1.875rem;
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  height: 2.1875rem;
  border: none;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.5s;

  @media (max-width: 475px) {
    height: 1.875rem;
    padding: 0 0.625rem;
  }

  &:disabled {
    background-color: gray;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6125rem;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 0.2rem;
  min-height: 2.5rem;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 100;
`;

export const LoadMore = styled(CommonButton)`
  width: 100%;
  margin: 1.875rem 0;
  padding: 1.875rem 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.xl};

  @media (max-width: 475px) {
    font-size: 1.125rem;
    padding: 1.25rem 0;
  }
`;

export const upAnimation = {
  initial: { opacity: 0, y: -20 },
  final: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const opacityAnimation = {
  initial: { opacity: 0 },
  final: { opacity: 1, transition: { duration: 1 } },
};
