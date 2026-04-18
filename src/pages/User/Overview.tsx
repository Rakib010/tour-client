import { useGetUserBookingQuery } from "@/redux/features/booking/booking.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { normalizeToArray } from "@/utils/normalizeList";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, FileText, ChevronRight, Loader2 } from "lucide-react";

export default function UserOverview() {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: bookingData, isLoading } = useGetUserBookingQuery(undefined);

  const bookings = normalizeToArray(bookingData?.data);
  const totalBookings = bookings.length;
  const paidWithInvoice = bookings.filter(
    (b: { payment?: { invoiceUrl?: string } }) => b.payment?.invoiceUrl
  ).length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {userData?.data?.name?.split(" ")[0] || "Traveler"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's a quick overview of your travel journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border hover:border-primary/30 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalBookings}</p>
            <Link to="/user/bookings">
              <Button variant="link" className="px-0 mt-2 h-auto p-0 text-primary gap-1">
                View all
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-primary/30 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Explore Tours
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Discover new destinations
            </p>
            <Button asChild size="sm">
              <Link to="/tour">Browse Tours</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border hover:border-primary/30 transition-colors overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Invoices
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              {paidWithInvoice} paid booking(s) with invoice
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/user/bookings">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {bookings.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest tour bookings
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.slice(0, 3).map(
                (booking: {
                  _id: string;
                  tour?: { title?: string };
                  status?: string;
                  createdAt?: string;
                }) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {booking.tour?.title || "Tour"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.createdAt || "").toLocaleDateString()} •{" "}
                        <span
                          className={
                            booking.status === "COMPLETE"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/user/bookings">View</Link>
                    </Button>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
