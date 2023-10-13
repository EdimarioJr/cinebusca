import styled from "styled-components";

export const DivCarousel = styled.div`
  width: 100%;
  height: 600px;

  h1 {
    margin: 20px 0;
  }

  img {
    height: 600px;
  }

  .slide {
    display: grid;
    place-content: center;
  }

  @media (max-width: 475px) {
    height: 400px;

    img {
      height: 400px;
    }
  }
`;

export const CaroulselButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: ${(props) => props.theme.fontSizes.md};
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;

  @media (max-width: 400px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
