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

export const SearchInputContainer = styled.div`
  width: 100%;
  background-color: #383d48;
  height: 10rem;
  padding: 3rem;
  margin-bottom: 3rem;
`;

export const SearchInput = styled.input`
  border: none;
  border-bottom: 2px solid #20242b;
  font-size: 1.8rem;
  padding: 0.8rem;
  color: white;
  width: 100%;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  background-color: transparent;
  transition: border 0.3s;

  &:focus {
    border-color: #107ee5;
  }

  &:focus-visible {
    outline: none;
  }
`;
