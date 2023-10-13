import { styled } from "styled-components";

import { CommonButton } from "@/styles/globals";

export const AddReview = styled(CommonButton)`
  background-color: ${(props) => props.theme.colors.success};
`;
export const CancelReview = styled(CommonButton)`
  background-color: ${(props) => props.theme.colors.danger};
`;

export const ReviewContainer = styled.section`
  position: relative;

  textarea {
    border: 1px solid #888;
    background-color: ${(props) => props.theme.colors.black};
    color: white;
    font-size: 1rem;
    font-family: inherit;
    padding: 0.625rem;
    overflow: auto;
    resize: none;
    width: 100%;
    height: 21.875rem;
    margin-bottom: 1rem;
  }

  .rowButtons {
    display: flex;
    gap: 2rem;
  }
`;
