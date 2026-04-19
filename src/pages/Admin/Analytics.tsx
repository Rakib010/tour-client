import {
  useGetUserStatsQuery,
  useGetTourStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} from "@/redux/features/stats/stats.api";
import { Users, Map, Calendar, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Chart colors aligned with the site's green-primary feel.
// (These are simple hex values so they work reliably in Recharts.)
const CHART_COLORS = ["#10b981", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#f59e0b"];

const ChartEmpty = ({ text }: { text: string }) => (
  <div className="h-[240px] flex items-center justify-center text-muted-foreground text-sm">
    {text}
  </div>
);

const ChartSkeleton = () => (
  <div className="h-[280px] w-full rounded-xl bg-muted/40 animate-pulse" />
);

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-sm">
      {label ? <p className="text-xs font-medium text-foreground mb-1">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((p: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: p?.color || p?.fill || "#10b981" }}
              />
              <span className="text-muted-foreground">{p?.name ?? p?.dataKey}</span>
            </div>
            <span className="font-semibold text-foreground">{p?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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

  const statsCards = [
    {
      title: "Total Users",
      value: userStats?.data?.totalUsers || 0,
      sub: `Active: ${userStats?.data?.totalActiveUsers || 0} | Inactive: ${userStats?.data?.totalInActiveUsers || 0}`,
      icon: Users,
      accent: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    },
    {
      title: "Total Tours",
      value: tourStats?.data?.totalTour || 0,
      sub: `Tour Types: ${tourStats?.data?.totalTourByTourType?.length || 0}`,
      icon: Map,
      accent: "from-cyan-500/20 via-cyan-500/10 to-transparent",
    },
    {
      title: "Total Bookings",
      value: bookingStats?.data?.totalBooking || 0,
      sub: `Last 30 days: ${bookingStats?.data?.bookingsLast30Days || 0}`,
      icon: Calendar,
      accent: "from-blue-500/20 via-blue-500/10 to-transparent",
    },
    {
      title: "Total Revenue",
      value: `৳${(paymentStats?.data?.totalRevenue?.[0]?.totalRevenue || 0).toLocaleString()}`,
      sub: `Payments: ${paymentStats?.data?.totalPayment || 0}`,
      icon: CreditCard,
      accent: "from-violet-500/20 via-violet-500/10 to-transparent",
    },
  ];

  // Chart data
  const bookingByStatusData =
    bookingStats?.data?.totalBookingByStatus?.map((item: { _id: string; count: number }) => ({
      name: item._id || "Unknown",
      count: item.count,
      fill: CHART_COLORS[bookingStats.data.totalBookingByStatus.indexOf(item) % CHART_COLORS.length],
    })) || [];

  const usersByRoleData =
    userStats?.data?.usersByRole?.map((item: { _id: string; count: number }) => ({
      name: item._id?.replace("_", " ") || "Unknown",
      value: item.count,
    })) || [];

  const topBookedToursData =
    tourStats?.data?.totalHighestBookedTour?.map(
      (item: { tour?: { title?: string }; bookingCount?: number }) => ({
        name: item?.tour?.title?.slice(0, 15) || "Tour",
        bookings: item.bookingCount || 0,
      })
    ) || [];

  const tourByTypeData =
    tourStats?.data?.totalTourByTourType?.map(
      (item: { _id: string; count: number }) => ({
        name: item._id || "Unknown",
        count: item.count,
      })
    ) || [];

  return (
    <div className="w-full max-w-[1280px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your tour business performance
        </p>
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl border border-border bg-card">
                <div className="p-5 space-y-3">
                  <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
                  <div className="h-7 w-32 bg-muted/50 rounded animate-pulse" />
                  <div className="h-3 w-40 bg-muted/50 rounded animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl border-border bg-card">
              <ChartSkeleton />
            </Card>
            <Card className="p-6 rounded-2xl border-border bg-card">
              <ChartSkeleton />
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl border-border bg-card">
              <ChartSkeleton />
            </Card>
            <Card className="p-6 rounded-2xl border-border bg-card">
              <ChartSkeleton />
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Soft accent wash to match site branding */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent}`} />

                <CardHeader className="relative flex flex-row items-center justify-between pb-2 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="relative px-5 pb-5">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bookings by Status */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Bookings by Status</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Distribution of booking statuses
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {bookingByStatusData.length ? (
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingByStatusData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.35 }} />
                        {/* Thinner bars for a cleaner look */}
                        <Bar
                          dataKey="count"
                          radius={[0, 6, 6, 0]}
                          name="Count"
                          barSize={10}
                          maxBarSize={12}
                        >
                          {bookingByStatusData.map((entry: { fill: string }, i: number) => (
                            <Cell key={`cell-${i}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <ChartEmpty text="No booking data yet" />
                )}
              </CardContent>
            </Card>

            {/* Users by Role */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Users by Role</CardTitle>
                <p className="text-sm text-muted-foreground">
                  User distribution across roles
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {usersByRoleData.length ? (
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usersByRoleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                        >
                          {usersByRoleData.map((_: unknown, index: number) => (
                            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <ChartEmpty text="No user data yet" />
                )}
                {usersByRoleData.length ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {usersByRoleData.map((item: any, i: number) => (
                      <div key={item.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                          <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Booked Tours */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Top Booked Tours</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Most popular tours by booking count
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {topBookedToursData.length ? (
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topBookedToursData} margin={{ left: 20, right: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.35 }} />
                        <Bar
                          dataKey="bookings"
                          fill="#10b981"
                          radius={[8, 8, 0, 0]}
                          name="Bookings"
                          barSize={14}
                          maxBarSize={16}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <ChartEmpty text="No tour booking data yet" />
                )}
              </CardContent>
            </Card>

            {/* Tours by Type */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Tours by Category</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tour distribution by type
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {tourByTypeData.length ? (
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tourByTypeData} margin={{ left: 20, right: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.35 }} />
                        <Bar
                          dataKey="count"
                          fill="#22c55e"
                          radius={[8, 8, 0, 0]}
                          name="Tours"
                          barSize={14}
                          maxBarSize={16}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <ChartEmpty text="No tour type data yet" />
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
