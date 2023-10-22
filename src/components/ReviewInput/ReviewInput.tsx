import React from "react";

import { Spinner } from "@/components";

import { ReviewContainer, AddReview, CancelReview } from "./styles";

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
}: ReviewInputProps) => (
  <ReviewContainer>
    <textarea
      placeholder="Add a review..."
      onChange={(event) => handleChangeReviewText(event.target.value)}
      value={reviewText}
      data-test="review-input"
    />
    <div className="rowButtons">
      <AddReview
        onClick={() =>
          reviewExists ? handleEditReview() : handleCreateReview()
        }
        data-test="create-review-button"
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
