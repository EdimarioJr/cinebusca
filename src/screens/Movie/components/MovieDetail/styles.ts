import styled from "styled-components";

import { CommonButton } from "@/styles/globals";

export const MovieContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;

  #poster {
    width: 25rem;
    height: 34.375rem;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    #poster {
      width: 55%;
      height: 80%;
      margin-bottom: 0.625rem;
    }
  }
`;

export const BackgroundFilter = styled.div<{ $back: string }>`
  width: 100%;
  height: 28.125rem;
  background-image: url(${({ $back }) => $back});
  background-size: cover;
  position: absolute;
  filter: blur(4.375rem);
  opacity: 0.8;
  top: 0;
  left: 0;
`;

export const MovieInfo = styled.div`
  position: relative;
  width: 100%;
  color: white;
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100%;

  h2 {
    margin-bottom: 1.25rem;
  }

  h1 {
    margin-bottom: 0.625rem;
    font-size: ${(props) => props.theme.fontSizes.xxl};
  }

  #director {
    font-weight: 300;
    font-size: ${(props) => props.theme.fontSizes.xl};
  }

  .info {
    position: relative;
    margin: 1.25rem 1.875rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5), -1px 1px rgba(0, 0, 0, 0.5),
      1px -1px rgba(0, 0, 0, 0.5), -1px -1px rgba(0, 0, 0, 0.5);
    flex: 1;

    .description {
      height: 15rem;
      line-height: 1.875rem;
      text-overflow: ellipsis;
      overflow: auto;
      font-size: ${(props) => props.theme.fontSizes.xl};
      flex: 1;
    }

    .genres {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      z-index: 2;
      margin: 0.625rem 0;

      p {
        margin-right: 1rem;
      }

      .genre-button {
        margin-right: 1rem;
        margin-bottom: 0.3125rem;
      }
    }
  }

  .rowButtons {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.625rem;
  }

  .footer {
    width: 100%;
    background-color: ${(props) => props.theme.colors.terciary};
    padding: 0.625rem 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    aside {
      margin-right: 1.25rem;
      display: flex;
      flex-direction: row;
      p {
        margin-right: 0.3125rem;
      }
    }
  }

  @media (max-width: 767px) {
    padding-top: 1rem;

    h1 {
      font-size: ${(props) => props.theme.fontSizes.lg};
    }

    h2 {
      margin-bottom: 0.625rem;
    }
    #director {
      font-size: ${(props) => props.theme.fontSizes.lg};
    }

    .info {
      margin: 0.625rem;
      height: 30rem;
      .description {
        font-size: ${(props) => props.theme.fontSizes.md};
        line-height: 1.25rem;
        height: 15.625rem;
      }

      .genres {
        p {
          margin-right: 0.625rem;
        }

        .genre-button {
          margin-right: 0.3125rem;
        }
      }
    }

    .footer {
      padding: 0.625rem;
      font-size: 0.625rem;
    }
  }

  @media (min-width: 1001px) and (max-width: 1100px) {
    .footer {
      font-size: ${(props) => props.theme.fontSizes.xs};
    }
  }
`;

export const WatchButton = styled(CommonButton)`
  width: 13rem;
  color: black;
  background-color: ${(props) => props.theme.colors.quaternary};
  margin-right: 1rem;
`;

export const ReviewButton = styled(CommonButton)`
  width: 13rem;
`;
