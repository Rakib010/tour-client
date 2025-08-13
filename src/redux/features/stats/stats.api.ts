import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserStats: builder.query({
            query: () => ({
                url: "/stats/user",
                method: "GET",
            }),
        }),
        getTourStats: builder.query({
            query: () => ({
                url: "/stats/tour",
                method: "GET",
            }),
        }),
        getBookingStats: builder.query({
            query: () => ({
                url: "/stats/booking",
                method: "GET",
            }),
        }),
        getPaymentStats: builder.query({
            query: () => ({
                url: "/stats/payment",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetUserStatsQuery,
    useGetTourStatsQuery,
    useGetBookingStatsQuery,
    useGetPaymentStatsQuery,
} = statsApi;
