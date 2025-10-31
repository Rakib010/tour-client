import { baseApi } from "@/redux/baseApi";

// invalidatesTags / providesTags — Ensures that after add, update, or delete, your UI auto-refetches the latest divisions.
export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDivision: builder.mutation({
            query: (formData) => ({
                url: "/division/create",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: ["DIVISION"],
        }),
        getDivisions: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["DIVISION"],
        }),
        updateDivision: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/division/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["DIVISION"],
        }),
        deleteDivision: builder.mutation({
            query: (id) => ({
                url: `/division/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DIVISION"],
        }),
    }),
});

export const {
    useAddDivisionMutation,
    useGetDivisionsQuery,
    useUpdateDivisionMutation,
    useDeleteDivisionMutation,
} = divisionApi;
