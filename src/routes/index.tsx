import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/components/modules/Authentication/Login";
import Register from "@/components/modules/Authentication/Register";
import Verify from "@/components/modules/Authentication/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "@/constants/sidebar/adminSidebarItems";
import { userSidebarItems } from "@/constants/sidebar/userSidebarItems";
import Unauthorized from "@/pages/unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/auth/role";
import type { TRole } from "@/interfaces";
import Categories from "@/pages/Categories";
import Tour from "@/pages/Tour/Tour";
import Home from "@/pages/Home";
import TourDetails from "@/pages/Tour/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "About",
        Component: About,
      },
      {
        path: "categories",
        Component: Categories,
      },
      {
        path: "tour",
        Component: Tour,
      },
      {
        path: "tourDetails/:id",
        Component: TourDetails,
      },
      {
        path: "booking/:id",
        Component: withAuth(Booking),
      },
    ],
  },

  /* Dashboard Admin*/
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  /* Dashboard User */
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/overview" replace /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  /* login,register,verify,unauthorized*/
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },

  /* payment */
  {
    path: "/payment/success",
    Component: Success,
  },
  {
    path: "/payment/fail",
    Component: Fail,
  },
  {
    path: "/payment/cancel",
    Component: Cancel,
  },
]);
