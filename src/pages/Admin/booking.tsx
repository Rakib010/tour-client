/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBookingQuery } from "@/redux/features/booking/booking.api";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Loader2, CheckCircle, Clock } from "lucide-react";

const statusBadge = (text: string, isSuccess: boolean) => (
  <span
    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
      isSuccess ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    }`}
  >
    {text}
  </span>
);

const BookingTable = ({
  bookings,
  title,
  emptyMsg,
  icon: Icon,
}: {
  bookings: any[];
  title: string;
  emptyMsg: string;
  icon: React.ElementType;
}) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      {title}
      <span className="text-sm font-normal text-muted-foreground">
        ({bookings.length})
      </span>
    </h2>
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
            <TableHead className="font-semibold text-foreground py-4 px-4">Tour Name</TableHead>
            <TableHead className="font-semibold text-foreground py-4 px-4">Transaction ID</TableHead>
            <TableHead className="font-semibold text-foreground py-4 px-4">Guests</TableHead>
            <TableHead className="font-semibold text-foreground py-4 px-4">Payment</TableHead>
            <TableHead className="font-semibold text-foreground py-4 px-4">Status</TableHead>
            <TableHead className="font-semibold text-foreground py-4 px-4">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length ? (
            bookings.map((booking: any) => (
              <TableRow key={booking._id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium py-4 px-4 truncate max-w-[200px]">
                  {booking?.tour?.title || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm py-4 px-4 truncate max-w-[140px] font-mono">
                  {booking?.payment?.transactionId || "—"}
                </TableCell>
                <TableCell className="py-4 px-4">{booking.guestCount}</TableCell>
                <TableCell className="py-4 px-4">
                  {statusBadge(booking?.payment?.status || "N/A", booking?.payment?.status === "PAID")}
                </TableCell>
                <TableCell className="py-4 px-4">
                  {statusBadge(booking.status, booking.status === "COMPLETE")}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm py-4 px-4">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                {emptyMsg}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default function Booking() {
  const { data: bookingAllData, isLoading, isError } =
    useGetAllBookingQuery(undefined);

  if (isError)
    return (
      <p className="text-center py-10 text-destructive">Failed to load bookings</p>
    );

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  const allBookings = bookingAllData?.data || [];
  const paidBookings = allBookings.filter(
    (b: any) => b?.payment?.status === "PAID"
  );
  const unpaidBookings = allBookings.filter(
    (b: any) => !b?.payment || b?.payment?.status !== "PAID"
  );

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">All Bookings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage paid and unpaid bookings
        </p>
      </div>

      <div className="space-y-10">
        <BookingTable
          bookings={paidBookings}
          title="Paid Bookings"
          emptyMsg="No paid bookings yet"
          icon={CheckCircle}
        />
        <BookingTable
          bookings={unpaidBookings}
          title="Unpaid Bookings"
          emptyMsg="No unpaid bookings"
          icon={Clock}
        />
      </div>
    </div>
  );
}
