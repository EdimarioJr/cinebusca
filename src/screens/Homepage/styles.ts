import styled from "styled-components";

export const Main = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    color: white;
    margin: 1.875rem 0;
    font-size: ${(props) => props.theme.fontSizes.xxxl};
  }

  .grid-movies {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 1.875rem;
    transition: all 0.5s;
  }

  @media (max-width: 735px) {
    .grid-movies {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.3125rem;
    }

    h1 {
      font-size: 1.875rem;
      margin: 1.25rem 0;
    }
  }

  @media (min-width: 736px) and (max-width: 979px) {
    .grid-movies {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 980px) and (max-width: 1700px) {
    .grid-movies {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
