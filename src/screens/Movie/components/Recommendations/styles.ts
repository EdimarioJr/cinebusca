import { styled } from "styled-components";

export const RecommendationsContainer = styled.section`
  width: 100%;
  margin: 1.875rem 0;

  h1 {
    margin-bottom: 1.25rem;
    color: white;
  }

  span {
    color: ${(props) => props.theme.colors.primary};
  }

  .recommendation-grid {
    display: grid;
    width: 80%;
    margin: 1.875rem auto;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 1.875rem;
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
