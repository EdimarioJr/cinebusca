import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  label {
    font-size: ${(props) => props.theme.fontSizes.sm};
    padding-bottom: 0.5rem;
  }

  p.error {
    color: ${(props) => props.theme.colors.danger};
    font-size: ${(props) => props.theme.fontSizes.xs};
    padding-top: 0.2rem;
    margin: 0;
  }
`;
