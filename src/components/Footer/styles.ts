import styled from "styled-components";

export const FooterContainer = styled.section`
  height: 8.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.875rem;
  background-color: ${(props) => props.theme.colors.terciary};

  p {
    color: white;
    margin-right: 1.875rem;
  }

  a {
    text-decoration: none;
    text-underline-position: none;
    font-weight: 700;
    color: white;
  }

  img {
    width: 6.25rem;
    height: 6.25rem;
  }
`;
