import { CommonButton } from "@/styles/globals";
import { styled } from "styled-components";

export const AddReview = styled(CommonButton)`
  background-color: #2caf1e;
`;
export const CancelReview = styled(CommonButton)`
  background-color: #fc0349;
`;

export const ReviewContainer = styled.section`
  position: relative;

  textarea {
    border: 1px solid #888;
    background-color: #20242b;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    padding: 10px;
    overflow: auto;
    resize: none;
    width: 100%;
    height: 350px;
    margin-bottom: 15px;
  }

  .rowButtons {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 500px) {
    margin: 20px 5px;
  }
`;
