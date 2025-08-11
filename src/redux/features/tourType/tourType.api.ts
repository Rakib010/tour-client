import { baseApi } from "@/redux/baseApi";

export const tourTypesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName,
            }),
            invalidatesTags: ["TOUR"],
        }),

        DeleteTourType: builder.mutation({
            query: (id) => ({
                url: `/tour/tour-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOUR"], // will trigger getTourTypes to refetch
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useDeleteTourTypeMutation,
} = tourTypesApi;
