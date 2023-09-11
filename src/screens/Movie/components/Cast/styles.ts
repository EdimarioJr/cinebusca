import { styled } from "styled-components";

export const CastContainer = styled.section`
  background-color: black;
  width: 100%;
  padding: 20px;

  h1 {
    color: white;
    margin-top: 1 0px;
    margin-bottom: 20px;
  }
`;

export const CastCards = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;

  .actorCard {
    margin-right: 30px;
    height: 350px;
    width: 220px;
    background-color: #c4c4c4;
    border-radius: 10px;
    position: relative;

    img {
      width: 220px;
      height: 100%;
      border-radius: 10px;
      display: block;
    }

    .actor-description {
      position: absolute;
      bottom: 0%;
      left: 0px;
      background-image: linear-gradient(to top, black, transparent);
      height: 130px;
      display: grid;
      place-content: center;
      width: 100%;
    }

    p {
      color: white;
      padding: 5px 10px;
    }
  }

  @media (max-width: 767px) {
    .actorCard {
      margin-right: 20px;
      height: 250px;
      width: 150px;

      img {
        width: 150px;
        height: 160px;
      }
    }
  }
`;
