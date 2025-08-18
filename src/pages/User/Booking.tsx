import { useGetUserBookingQuery } from "@/redux/features/booking/booking.api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

export default function Booking() {
  const { data: bookingData, isLoading } = useGetUserBookingQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  const hasBookings = bookingData?.data?.length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
      </div>

      {!hasBookings ? (
        <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
          <p className="text-gray-600 text-lg font-medium">
            You don’t have any bookings yet 📭
          </p>
          <Link to="/tour">
            <Button className="mt-4">Browse Tours</Button>
          </Link>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-1/4 text-left font-semibold text-gray-700">
                  Tour Name
                </TableHead>
                <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                  Cost
                </TableHead>
                <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                  Guests
                </TableHead>
                <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="w-1/6 text-left font-semibold text-gray-700">
                  Booked Date
                </TableHead>
                <TableHead className="w-1/6 text-right font-semibold text-gray-700">
                  Invoice
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookingData.data.map((booking: any) => (
                <TableRow
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-800 truncate">
                    {booking.tour.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {booking.tour.costFrom} ৳
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {booking.guestCount}
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
                  <TableCell className="text-right">
                    {booking.payment?.invoiceUrl ? (
                      <Link
                        to={booking.payment.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline">
                          View Invoice
                        </Button>
                      </Link>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
