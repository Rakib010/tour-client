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
        getUserBooking: builder.query({
            query: () => ({
                url: "/booking/my-bookings",
                method: "GET",
            }),
            providesTags: ["BOOKING"],
        }),
        getAllBooking: builder.query({
            query: () => ({
                url: "/booking",
                method: "GET",
            }),
            providesTags: ["BOOKING"],
        }),

        /* payment */
        payment: builder.mutation({
            query: (id: string) => ({
                url: `/payment/init-payment/${id}`,
                method: "POST",
            }),
            // After a successful payment the backend typically updates the booking/payment
            // (e.g. sets `payment.status=PAID` and attaches `payment.invoiceUrl`).
            // Invalidate booking queries so dashboards refetch and show the invoice.
            invalidatesTags: ["BOOKING"],
        }),
    }),
});

export const {
    useCreatingBookingMutation,
    usePaymentMutation,
    useGetAllBookingQuery,
    useGetUserBookingQuery,
} = BookingApi;
