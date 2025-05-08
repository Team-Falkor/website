import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/download/private")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/download/private"!</div>;
}
