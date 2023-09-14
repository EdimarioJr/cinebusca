import styled from "styled-components";

export const AuthContainer = styled.main`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    color: white;
    height: 600px;
    border-radius: 0.4rem;
    background-color: #383d48;
    display: flex;
    flex-direction: column;
    width: 500px;
    align-items: center;
    justify-content: center;

    .signButton {
      padding: 0px 30px;
    }

    h1 {
      margin-bottom: 40px;
    }

    form {
      margin-bottom: 30px;
      width: 70%;

      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    input {
      margin-top: 0.5rem;
    }
    button {
    }

    span.option {
      color: #107ee5;
      margin-left: 10px;
      cursor: pointer;
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
      width: 350px;
      height: 400px;

      form {
        width: 80%;
      }

      .signButton {
        padding: 0px 20px;
      }
    }
  }

  @media (min-width: 476px) and (max-width: 538px) {
    .card {
      width: 420px;
    }
  }
`;
