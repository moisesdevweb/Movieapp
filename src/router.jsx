import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { Celebrity } from "./pages/Celebrity";
import { TrendingCelebrity } from "./pages/TrendingCelebrity";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "actor/:id",
        element: <Celebrity />,
      },
      {
        path: "trending-persons",
        element: <TrendingCelebrity />,
      },
    ],
  },
]);
