import styled from "styled-components";

export const MovieContainer = styled.div`
  background-color: #383d48;
  color: white;
  width: 17.2rem;
  height: 28.75rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.yellow};
  }

  &:hover {
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};
    position: relative;
    transform: scale3d(1.1, 1.1, 0.3);
    transition: all 0.2s;
    transition-timing-function: linear;
  }

  img {
    height: 80%;
    width: 100%;
    border-radius: ${(props) => props.theme.borderRadius.md};
  }

  .legend {
    width: 100%;
    padding: 0.625rem 0;
    padding-left: 1rem;
    padding-right: 0.625rem;

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  @media (max-width: 475px) {
    width: 10.4rem;
    height: 20.625rem;
  }

  @media (min-width: 476px) and (max-width: 1109px) {
    width: 14.375rem;
    height: 28.125rem;
  }

  @media (min-width: 1110px) and (max-width: 1320px) {
    width: 16.25rem;
    height: 28.125rem;
  }
`;
