import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
	component: RouteComponent,
});

export function RouteComponent() {
	return (
		<div className="relative overflow-hidden isolate">
			{/* <div className="absolute inset-0 -z-9">
        <ParticleSystem />
      </div> */}

			<Navbar />

			<Toaster richColors={true} position="top-center" />

			<Outlet />
			{/* <TanStackRouterDevtools /> */}
		</div>
	);
}
