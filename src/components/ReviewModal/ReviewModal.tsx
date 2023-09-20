import React, { ReactNode, useState } from "react";
import { StyledModal } from "./styles";
import { MovieDetails } from "@/models";
import { ReviewInput } from "@/components/ReviewInput";
import { useMovieReview } from "@/hooks";
import { CommonButton } from "@/styles/globals";
import { AiOutlineClose } from "react-icons/ai";

export type ReviewModalProps = {
  modalButton: ({ toggleModal }: { toggleModal: () => void }) => ReactNode;
  id: MovieDetails["id"];
  poster_path: MovieDetails["poster_path"];
  title: MovieDetails["title"];
};

export const ReviewModal = ({
  modalButton,
  id,
  poster_path,
  title,
}: ReviewModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
      {modalButton({ toggleModal })}
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
