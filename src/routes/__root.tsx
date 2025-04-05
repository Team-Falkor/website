import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="relative overflow-hidden isolate">
      {/* <div className="absolute inset-0 -z-9">
        <ParticleSystem />
      </div> */}

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
