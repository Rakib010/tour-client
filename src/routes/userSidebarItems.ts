
import Booking from "@/pages/User/Booking";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
    {
        title: "User",
        items: [
            {
                title: "Bookings",
                url: "/user/bookings",
                component: Booking,
            },
        ],
    },
];
