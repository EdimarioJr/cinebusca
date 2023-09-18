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

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewService = createApi({
  reducerPath: "reviewService",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[] | [], GetUserReviewsParams>({
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from("review")
          .select("*")
          .eq("user", userId);

        if (error) return { error };

        return { data };
      },
      providesTags: [{ type: "Review", id: "LIST" }],
    }),
    getMovieReview: builder.query<Review | null, GetMovieReviewParams>({
      queryFn: async ({ userId, movieId }) => {
        const { data, error } = await supabase
          .from("review")
          .select("*")
          .eq("user", userId)
          .eq("movieId", movieId);

        if (error) return { error };

        return { data: data?.[0] ?? null };
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
        const { data, error } = await supabase
          .from("review")
          .insert({ movieId, user, review, date, movieTitle, moviePoster })
          .select();

        if (error) return { error };

        return { data: data[0] as unknown as Review };
      },
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "CHECK" },
      ],
    }),
    editReview: builder.mutation<boolean, UpdateReview>({
      queryFn: async ({ id, review, date }: UpdateReview) => {
        const { error } = await supabase
          .from("review")
          .update({ review, date })
          .eq("id", id);

        if (error) return { error };

        return { data: true };
      },
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "CHECK" },
      ],
    }),
    deleteReview: builder.mutation<boolean, DeleteReview>({
      queryFn: async ({ id }: DeleteReview) => {
        const { error } = await supabase.from("review").delete().eq("id", id);

        if (error) throw new Error(error.message);

        return { data: true };
      },
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetMovieReviewQuery,
  useCreateReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewService;
