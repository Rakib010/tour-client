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
import { Loader2, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router";

export default function Booking() {
  const { data: bookingData, isLoading } = useGetUserBookingQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasBookings = bookingData?.data?.length > 0;
  const bookings = bookingData?.data || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-7 w-7 text-primary" />
          My Bookings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and manage your tour bookings
        </p>
      </div>

      {!hasBookings ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-border bg-muted/20">
          <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            No bookings yet
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Explore our tours and book your next adventure
          </p>
          <Button asChild>
            <Link to="/tour">Browse Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                <TableHead className="font-semibold text-foreground py-4 px-4">Tour</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4">Transaction ID</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4">Price</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4">Guests</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4">Status</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4">Date</TableHead>
                <TableHead className="font-semibold text-foreground py-4 px-4 text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow key={booking._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4 px-4 truncate max-w-[200px]">
                    {booking.tour?.title || "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm py-4 px-4 truncate max-w-[160px] font-mono">
                    {booking.payment?.transactionId || "—"}
                  </TableCell>
                  <TableCell className="py-4 px-4">৳{booking.tour?.costFrom ?? "—"}</TableCell>
                  <TableCell className="py-4 px-4">{booking.guestCount}</TableCell>
                  <TableCell className="py-4 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "COMPLETE"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm py-4 px-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {booking.payment?.invoiceUrl ? (
                      <a
                        href={booking.payment.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline" className="gap-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Invoice
                        </Button>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
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
