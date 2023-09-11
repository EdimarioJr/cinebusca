import { styled } from "styled-components";

export const RecommendationsContainer = styled.section`
  width: 100%;
  margin: 30px 0;

  h1 {
    margin-bottom: 20px;
    color: white;
  }

  span {
    color: #107ee5;
  }

  .recommendation-grid {
    display: grid;
    width: 80%;
    margin: 30px auto;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 30px;
  }

  @media (max-width: 739px) {
    .recommendation-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 740px) and (max-width: 1000px) {
    .recommendation-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
