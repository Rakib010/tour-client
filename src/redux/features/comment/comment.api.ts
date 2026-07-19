import { baseApi } from "@/redux/baseApi";

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (tourId: string) => ({
                url: "/comment",
                method: "GET",
                params: { tourId },
            }),
            providesTags: ["COMMENT"],
        }),
        createComment: builder.mutation({
            query: (data: { tour: string; content: string; rating: number }) => ({
                url: "/comment",
                method: "POST",
                data,
            }),
            invalidatesTags: ["COMMENT"],
        }),
        deleteComment: builder.mutation({
            query: (id: string) => ({
                url: `/comment/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["COMMENT"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;
