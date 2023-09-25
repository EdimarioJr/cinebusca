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
    background-color: #20242B;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23383D48' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23383D48'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
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
