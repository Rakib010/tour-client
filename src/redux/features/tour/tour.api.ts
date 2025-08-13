import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (formData) => ({
                url: "/tour/create",
                method: "POST",
                data: formData,
            }),
        }),
        getTour: builder.query({
            query: () => ({
                url: "/tour/get",
                method: "GET",
            }),

        }),
    }),
});

export const {
    useAddTourMutation,
    useGetTourQuery
} = tourApi;
