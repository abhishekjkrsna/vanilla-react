import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/navbar/Navbar";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const Route = createRootRoute({
  component: () => (
    <div className="container-fluid">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
});
