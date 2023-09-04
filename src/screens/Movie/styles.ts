import styled from "styled-components";

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

export const Gallery = styled.section`
  width: 100%;
  height: 600px;
  margin: 20px 0;
  position: relative;
  border-radius: 10px;
`;

export const RecommendationsContainer = styled.section`
  width: 100%;
  margin: 30px 0;

  h1 {
    margin-bottom: 20px;
    color: white;
  }

  span {
    color: #107ee5;
  }

  .recommendation-grid {
    display: grid;
    width: 80%;
    margin: 30px auto;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 30px;
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
