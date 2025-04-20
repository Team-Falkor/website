import { motion } from "framer-motion";
import { useState } from "react";

import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import { DynamicBreadcrumbs } from "@/components/ui/dynamic-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/sidebar";
import { AdminGuard } from "@/features/auth/components/AdminGuard";
import CreateEventDialog from "@/features/roadmap/components/admin/CreateEventDialog";
import RoadmapEventList from "@/features/roadmap/components/admin/RoadmapEventList";
import UpdateEventDialog from "@/features/roadmap/components/admin/UpdateEventDialog";
import {
  useCreateRoadmapEvent,
  useDeleteRoadmapEvent,
  useRoadmapEvents,
  useUpdateRoadmapEvent,
} from "@/features/roadmap/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { RoadmapEvent, RoadmapEventData } from "@team-falkor/shared-types";

export const Route = createFileRoute("/admin/roadmap/")({
  component: () => <div>Not found</div>,
});

export function RoadmapAdmin() {
  const { data: roadmapEvents, isLoading, isError, error } = useRoadmapEvents();
  const { mutate: createEvent } = useCreateRoadmapEvent();
  const { mutate: updateEvent } = useUpdateRoadmapEvent();
  const { mutate: deleteEvent } = useDeleteRoadmapEvent();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<RoadmapEventData | null>(
    null
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleCreateEvent = (newEvent: RoadmapEvent) => {
    createEvent(newEvent);
    setShowCreateModal(false);
  };

  const handleOpenUpdateDialog = (event: RoadmapEventData) => {
    setSelectedEvent(event);
    setShowUpdateModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <AdminGuard>
      <div className="min-h-svh bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
        <SvgBG />
        <SidebarProvider>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 h-full w-full"
          >
            <div className="flex h-svh w-full overflow-hidden ">
              <AdminSidebar className="overflow-hidden" />
              <div className="flex-1 flex flex-col h-full overflow-auto w-full">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <DynamicBreadcrumbs />
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-6">
                  <div className="px-4 mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-bold tracking-tight"
                      >
                        Roadmap Events
                      </motion.h1>
                      <motion.div variants={itemVariants}>
                        <Button onClick={() => setShowCreateModal(true)}>
                          Add New Event
                        </Button>
                      </motion.div>
                    </div>
                    <motion.div variants={itemVariants} className="h-full">
                      <RoadmapEventList
                        events={roadmapEvents || []}
                        onDelete={(i) => {
                          deleteEvent(Number(i));
                        }}
                        onUpdate={handleOpenUpdateDialog}
                      />
                    </motion.div>
                  </div>
                </main>
              </div>
            </div>

            <CreateEventDialog
              open={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onCreate={handleCreateEvent}
            />
            {selectedEvent && (
              <UpdateEventDialog
                open={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                event={selectedEvent}
                onUpdate={(i) => {
                  updateEvent({
                    id: Number(i.id),
                    phase: i.phase,
                    status: i.status,
                    items: i.items,
                  });
                }}
              />
            )}
          </motion.div>
        </SidebarProvider>
      </div>
    </AdminGuard>
  );
}
