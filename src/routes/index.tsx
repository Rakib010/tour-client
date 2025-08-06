import App from "@/App";
import About from "@/pages/about";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // element: <App />,
    children: [
      {
        path: "About",
        Component: About,
      },
    ],
  },
]);
