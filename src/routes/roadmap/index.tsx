import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import { events } from "@/data/roadmap";
import { VerticalEventTimeline } from "@/features/roadmap/components/vertical-event";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/roadmap/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="relative p-4 md:p-8 pb-16 overflow-hidden min-h-svh">
        <SvgBG />
        {!!events.length && (
          <VerticalEventTimeline
            events={events}
            subtitle="Details the key tasks required to complete each project phase"
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
