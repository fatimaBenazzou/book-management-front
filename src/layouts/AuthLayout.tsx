import { Navigate, Outlet } from "react-router";
import useUser from "../hooks/useUser";

export default function AuthLayout() {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }
  return (
    <div>
      <h1>Auth</h1>
      <Outlet />
    </div>
  );
}
