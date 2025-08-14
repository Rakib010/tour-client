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
            query: () => ({
                url: "/tour/get",
                method: "GET",
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
    }),
});

export const {
    useAddTourMutation,
    useGetTourQuery,
    useDeleteTourMutation
} = tourApi;
