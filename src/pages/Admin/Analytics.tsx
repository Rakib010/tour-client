import {
  useGetUserStatsQuery,
  useGetTourStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} from "@/redux/features/stats/stats.api";
import { Users, Map, Calendar, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Analytics() {
  const { data: userStats, isLoading: loadingUsers } =
    useGetUserStatsQuery(undefined);
  const { data: tourStats, isLoading: loadingTours } =
    useGetTourStatsQuery(undefined);
  const { data: bookingStats, isLoading: loadingBookings } =
    useGetBookingStatsQuery(undefined);
  const { data: paymentStats, isLoading: loadingPayments } =
    useGetPaymentStatsQuery(undefined);

  const loading =
    loadingUsers || loadingTours || loadingBookings || loadingPayments;

  // Cards with correct fields from your API response
  const statsCards = [
    {
      title: "Total Users",
      value: userStats?.data?.totalUsers || 0,
      sub: `Active: ${userStats?.data?.totalActiveUsers || 0} | Inactive: ${
        userStats?.data?.totalInActiveUsers || 0
      }`,
      icon: <Users className="h-6 w-6 text-blue-200" />,
      bg: "bg-blue-600",
      text: "text-white",
    },
    {
      title: "Total Tours",
      value: tourStats?.data?.totalTour || 0,
      sub: `Tour Types: ${tourStats?.data?.totalTourByTourType?.length || 0}`,
      icon: <Map className="h-6 w-6 text-green-200" />,
      bg: "bg-green-600",
      text: "text-white",
    },
    {
      title: "Total Bookings",
      value: bookingStats?.data?.totalBooking || 0,
      sub: `Last 30 days: ${bookingStats?.data?.bookingsLast30Days || 0}`,
      icon: <Calendar className="h-6 w-6 text-yellow-200" />,
      bg: "bg-yellow-500",
      text: "text-gray-900",
    },
    {
      title: "Total Revenue",
      value: `$${paymentStats?.data?.totalRevenue?.[0]?.total || 0}`,
      sub: `Payments: ${paymentStats?.data?.totalPayment || 0}`,
      icon: <CreditCard className="h-6 w-6 text-purple-200" />,
      bg: "bg-purple-600",
      text: "text-white",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Analytics Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card
              key={index}
              className={`${stat.bg} ${stat.text} shadow-md hover:shadow-xl transition rounded-xl`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-white/20">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs opacity-80">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
