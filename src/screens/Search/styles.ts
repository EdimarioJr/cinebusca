import styled from "styled-components";

export const SearchContainer = styled.main`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 20px;
  }

  @media (max-width: 758px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 759px) and (max-width: 1013px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
