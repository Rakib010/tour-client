import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "About",
        Component: About,
      },
    ],
  },

  /* Dashboard Admin*/
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },

  /* Dashboard User */
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoutes(userSidebarItems)],
  },

  /* login,register,verify*/
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
]);
