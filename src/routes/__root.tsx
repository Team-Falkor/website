import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RouteComponent,
});

export function RouteComponent() {
  useAnalytics();

  return (
    <div className="relative overflow-hidden isolate">
      {/* <div className="absolute inset-0 -z-9">
        <ParticleSystem />
      </div> */}

      <Navbar />

      <Toaster />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
}
