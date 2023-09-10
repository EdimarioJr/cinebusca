export type Review = {
  id: string;
  review: string;
  date: string;
  movieId: number;
  user: string;
  moviePoster: string;
  movieTitle: string;
};

export type CreateReview = Omit<Review, "id">;

export type DeleteReview = Pick<Review, "id">;

export type UpdateReview = Pick<Review, "id" | "review" | "date">;
