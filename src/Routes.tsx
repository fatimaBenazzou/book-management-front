import { Navigate, useRoutes } from "react-router";
import { lazy } from "react";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const AppLayout = lazy(() => import("./layouts/AppLayout"));
const Home = lazy(() => import("./pages/Home"));

export default function Routes() {
  return useRoutes([
    { index: true, element: <Navigate to={"/app"} replace /> },
    {
      path: "/app",
      Component: AppLayout,
      children: [
        { index: true, element: <Navigate to="/app/home" replace /> },
        { path: "home", Component: Home },
      ],
    },
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: "login", Component: Login },
        { path: "register", Component: Register },
      ],
    },
  ]);
}
