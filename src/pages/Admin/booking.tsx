import { useGetAllBookingQuery } from "@/redux/features/booking/booking.api";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function Booking() {
  const {
    data: bookingAllData,
    isLoading,
    isError,
  } = useGetAllBookingQuery(undefined);

  console.log(bookingAllData);

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load bookings</p>
    );

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-1/4 text-left font-semibold text-gray-700">
                Tour Name
              </TableHead>
              <TableHead className="w-1/4 text-left font-semibold text-gray-700">
                Transaction_Id
              </TableHead>
              <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                Guests
              </TableHead>
              <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                Payment Status
              </TableHead>
              <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                Booking Status
              </TableHead>
              <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                Booked Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookingAllData?.data?.map((booking: any) => (
              <TableRow
                key={booking._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-gray-800 truncate">
                  {booking.tour.title}
                </TableCell>
                <TableCell className="font-medium text-gray-800 truncate">
                  {booking.payment.transactionId}
                </TableCell>
                <TableCell className="text-gray-600">
                  {booking.guestCount}
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    booking?.payment?.status === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.payment?.status || "N/A"}
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    booking.status === "COMPLETE"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.status}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
