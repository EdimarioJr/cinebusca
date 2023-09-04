export type Review = {
  id: string;
  review: string;
  date: string;
  movieId: number;
  user: string;
};

export type CreateReview = Pick<Review, "review" | "movieId" | "user" | "date">;

export type DeleteReview = Pick<Review, "id">;

export type UpdateReview = Pick<Review, "id" | "review" | "date">;
