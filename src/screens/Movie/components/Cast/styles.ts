import { styled } from "styled-components";

export const CastContainer = styled.section`
  background-color: black;
  width: 100%;
  padding: 1.25rem;

  h1 {
    color: white;
    margin-top: 0.625rem;
    margin-bottom: 1.25rem;
  }
`;

export const CastCards = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;

  .actorCard {
    margin-right: 30px;
    height: 21.875rem;
    width: 13.75rem;
    background-color: #c4c4c4;
    border-radius: 0.625rem;
    position: relative;

    img {
      width: 13.75rem;
      height: 100%;
      border-radius: 0.625rem;
      display: block;
    }

    .actor-description {
      position: absolute;
      bottom: 0%;
      left: 0px;
      background-image: linear-gradient(to top, black, transparent);
      height: 8.125rem;
      display: grid;
      place-content: center;
      width: 100%;
    }

    p {
      color: white;
      padding: 0.3125rem 0.625rem;
    }
  }

  @media (max-width: 767px) {
    .actorCard {
      margin-right: 1.25rem;
      height: 15.625rem;
      width: 9.375rem;

      img {
        width: 9.375rem;
        height: 10rem;
      }
    }
  }
`;
