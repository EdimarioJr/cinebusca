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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #107ee5;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
`;
