import styled from "styled-components";

export const AuthContainer = styled.main`
  width: 100%;
  min-height: 31.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    color: white;
    height: 37.5rem;
    border-radius: 0.4rem;
    background-color: ${(props) => props.theme.colors.terciary};
    display: flex;
    flex-direction: column;
    width: 31.25rem;
    align-items: center;
    justify-content: center;

    .signButton {
      padding: 0px 1.875rem;
    }

    h1 {
      margin-bottom: 2.5rem;
    }

    form {
      margin-bottom: 1.875rem;
      width: 70%;

      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    input {
      margin-top: 0.5rem;
    }

    .option {
      color: ${(props) => props.theme.colors.primary};
      margin-left: 0.625rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-size: ${(props) => props.theme.fontSizes.md};
    }
  }

  form {
    display: flex;
    flex-direction: column;

    button {
      align-self: center;
    }
  }

  @media (max-width: 475px) {
    .card {
      width: 21.875rem;
      height: 25rem;

      form {
        width: 80%;
      }

      .signButton {
        padding: 0px 1.25rem;
      }
    }
  }

  @media (min-width: 476px) and (max-width: 538px) {
    .card {
      width: 26.25rem;
    }
  }
`;
