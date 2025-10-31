import Booking from "@/pages/Admin/booking";
import Division from "@/pages/Admin/Division";
import Tour from "@/pages/Admin/Tour";
import TourType from "@/pages/Admin/TourType";

//import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSidebarItems: ISidebarItem[] = [

    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            },
        ],
    },
    /* Tour Management section */
    {
        title: "Tour Management",
        items: [
            {
                title: "Tour Type",
                url: "/admin/add-tour-type",
                component: TourType
            },
            {
                title: "Division",
                url: "/admin/add-division",
                component: Division
            },
            {
                title: "Tour",
                url: "/admin/add-tour",
                component: Tour
            },
            {
                title: "Booking All User",
                url: "/admin/booking",
                component: Booking
            },
        ],
    },
]