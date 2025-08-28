import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (formData) => ({
                url: "/tour/create",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: ["TOUR"],
        }),
        getTour: builder.query({
            query: (params) => ({
                url: "/tour/get",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
        }),
        deleteTour: builder.mutation({
            query: (id) => ({
                url: `/tour/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOUR"],
        }),
        updateTour: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tour/${id}`,
                method: "PATCH",
                data,
            }),
        }),
    }),
});

export const {
    useAddTourMutation,
    useGetTourQuery,
    useDeleteTourMutation,
    useUpdateTourMutation
} = tourApi;
