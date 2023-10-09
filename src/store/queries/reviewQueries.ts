import {
  CreateReview,
  DeleteReview,
  Review,
  UpdateReview,
} from "@/models/review";
import { reviewService } from "@/services";

export type BaseReviewOperationParams = {
  userId: string;
  movieId: number;
};

export type GetMovieReviewParams = BaseReviewOperationParams;

export type GetUserReviewsParams = { userId: string };

export type InReviewParams = BaseReviewOperationParams;

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewQueries = createApi({
  reducerPath: "reviewQueries",
  // só pra conseguir colocar meu proprio cliente HTTP ( nesse caso a SDK do supabase)
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[] | [], GetUserReviewsParams>({
      queryFn: async ({ userId }) => {
        const data = await reviewService.getReviews({ userId });

        return { data };
      },
      providesTags: [{ type: "Review", id: "LIST" }],
    }),
    getMovieReview: builder.query<Review | null, GetMovieReviewParams>({
      queryFn: async ({ userId, movieId }) => {
        const data = await reviewService.getMovieReview({ userId, movieId });

        return { data };
      },
      providesTags: [{ type: "Review", id: "CHECK" }],
    }),
    createReview: builder.mutation<Review, CreateReview>({
      queryFn: async ({
        movieId,
        user,
        review,
        date,
        movieTitle,
        moviePoster,
      }: CreateReview) => {
        const data = await reviewService.createReview({
          movieId,
          user,
          review,
          date,
          movieTitle,
          moviePoster,
        });

        return { data };
      },
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "CHECK" },
      ],
    }),
    editReview: builder.mutation<boolean, UpdateReview>({
      queryFn: async ({ id, review, date }: UpdateReview) => {
        await reviewService.editReview({ id, review, date });

        return { data: true };
      },
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "CHECK" },
      ],
    }),
    deleteReview: builder.mutation<boolean, DeleteReview>({
      queryFn: async ({ id }: DeleteReview) => {
        await reviewService.deleteReview({ id });

        return { data: true };
      },
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "CHECK" },
      ],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetMovieReviewQuery,
  useCreateReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewQueries;
