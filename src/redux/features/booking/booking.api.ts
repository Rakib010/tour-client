import { baseApi } from "@/redux/baseApi";

export const BookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        creatingBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/booking",
                method: "POST",
                data: bookingData,
            }),
            invalidatesTags: ["BOOKING"],
        }),
        getBooking: builder.query({
            query: () => ({
                url: "/booking",
                method: "GET",
            }),
        }),

        /* payment */
        payment: builder.mutation({
            query: (id: string) => ({
                url: `/payment/init-payment/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useCreatingBookingMutation,
    usePaymentMutation,
} = BookingApi;
