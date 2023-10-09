import { supabase } from "@/config";
import {
  CreateReview,
  DeleteReview,
  Review,
  UpdateReview,
} from "@/models/review";

export type BaseReviewOperationParams = {
  userId: string;
  movieId: number;
};

export type GetMovieReviewParams = BaseReviewOperationParams;

export type GetUserReviewsParams = { userId: string };

export type InReviewParams = BaseReviewOperationParams;

class ReviewService {
  async getReviews({ userId }: GetUserReviewsParams): Promise<Review[] | []> {
    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("user", userId);

    if (error) throw new Error(error.message);

    return data;
  }

  async hasReviewed({ userId, movieId }: InReviewParams): Promise<boolean> {
    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("user", userId)
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return Boolean(data?.length);
  }

  async getMovieReview({
    userId,
    movieId,
  }: GetMovieReviewParams): Promise<Review | null> {
    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("user", userId)
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return data.length ? (data[0] as Review) : null;
  }

  async createReview({
    movieId,
    user,
    review,
    date,
    movieTitle,
    moviePoster,
  }: CreateReview): Promise<Review> {
    const { data, error } = await supabase
      .from("review")
      .insert({ movieId, user, review, date, movieTitle, moviePoster })
      .select();

    if (error) throw new Error(error.message);

    return data[0] as unknown as Review;
  }

  async editReview({ id, review, date }: UpdateReview) {
    const { error } = await supabase
      .from("review")
      .update({ review, date })
      .eq("id", id);

    if (error) throw new Error(error.message);
  }

  async deleteReview({ id }: DeleteReview) {
    const { error } = await supabase.from("review").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }
}

export const reviewService = new ReviewService();
