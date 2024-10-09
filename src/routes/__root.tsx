import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="relative overflow-hidden isolate">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
