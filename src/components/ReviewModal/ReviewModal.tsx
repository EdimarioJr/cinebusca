import React, { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { ReviewInput } from "@/components/ReviewInput";
import { useMovieReview } from "@/hooks";
import { MovieDetails } from "@/models";
import { CommonButton } from "@/styles/globals";

import { StyledModal } from "./styles";

export type ReviewModalProps = {
  id: MovieDetails["id"];
  poster_path: MovieDetails["poster_path"];
  title: MovieDetails["title"];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ReviewModal = ({
  id,
  poster_path,
  title,
  isOpen,
  setIsOpen,
}: ReviewModalProps) => {
  const [opacity, setOpacity] = useState(0);

  const {
    handleCancelReview,
    handleEditReview,
    handleCreateReview,
    reviewText,
    setReviewText,
    isLoadingCreateReview,
    isLoadingEditReview,
    reviewApi,
  } = useMovieReview({
    idMovie: id,
    moviePoster: poster_path,
    movieTitle: title,
  });

  function toggleModal() {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setReviewText(reviewApi?.review ?? "");
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 100);
    });
  }

  return (
    <div>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <div className="header-row">
          <h3>Review</h3>
          <CommonButton onClick={toggleModal}>
            <AiOutlineClose />
          </CommonButton>
        </div>

        <h2>{title}</h2>

        <ReviewInput
          reviewExists={Boolean(reviewApi?.id)}
          handleCancelReview={() => {
            handleCancelReview();
            toggleModal();
          }}
          handleCreateReview={async () => {
            await handleCreateReview();
            toggleModal();
          }}
          handleEditReview={handleEditReview}
          reviewText={reviewText}
          handleChangeReviewText={(value) => setReviewText(value)}
          isLoading={isLoadingCreateReview || isLoadingEditReview}
        />
      </StyledModal>
    </div>
  );
};
