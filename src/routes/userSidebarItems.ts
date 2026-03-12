
import Booking from "@/pages/User/Booking";
import UserOverview from "@/pages/User/Overview";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Booking,
      },
    ],
  },
];
