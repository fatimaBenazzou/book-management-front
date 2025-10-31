import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div>
      <h1>App</h1>
      <Outlet />
    </div>
  );
}
