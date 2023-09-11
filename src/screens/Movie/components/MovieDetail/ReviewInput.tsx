import React from "react";
import { ReviewContainer, AddReview, CancelReview } from "./styles";

import { Spinner } from "../../../../components";

export type ReviewInputProps = {
  reviewExists: boolean;
  handleCreateReview: () => void;
  handleEditReview: () => void;
  handleCancelReview: () => void;
  isLoading: boolean;
  reviewText: string;
  handleChangeReviewText: (value: string) => void;
};

export const ReviewInput = ({
  reviewExists,
  handleCreateReview,
  handleEditReview,
  isLoading,
  handleCancelReview,
  reviewText,
  handleChangeReviewText,
}: ReviewInputProps) => {
  return (
    <ReviewContainer>
      <textarea
        placeholder="Add a review..."
        onChange={(event) => handleChangeReviewText(event.target.value)}
        value={reviewText}
      ></textarea>
      <div className="rowButtons">
        <AddReview
          onClick={() =>
            reviewExists ? handleEditReview() : handleCreateReview()
          }
        >
          {isLoading ? (
            <Spinner boxSize="1.5rem" />
          ) : reviewExists ? (
            "Edit review"
          ) : (
            "Create review"
          )}
        </AddReview>
        <CancelReview onClick={handleCancelReview}>Cancel</CancelReview>
      </div>
    </ReviewContainer>
  );
};
