import Overview from "@/pages/User/Overview";
import Profile from "@/pages/User/Profile";
import Booking from "@/pages/User/Booking";
import Favorites from "@/pages/User/Favorites";
import Support from "@/pages/User/Support";
import type { ISidebarItem } from "@/interfaces";

/** User dashboard sidebar: Overview (default), Profile, Bookings, Favorites, Help & Support */
export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: Overview,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Travel",
    items: [
      {
        title: "My Bookings",
        url: "/user/bookings",
        component: Booking,
      },
      {
        title: "Favorites",
        url: "/user/favorites",
        component: Favorites,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Help & Support",
        url: "/user/support",
        component: Support,
      },
    ],
  },
];

