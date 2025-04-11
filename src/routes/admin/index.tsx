import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import SvgBG from "@/components/svgBG";
import { DynamicBreadcrumbs } from "@/components/ui/dynamic-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/sidebar";
import { AdminGuard } from "@/features/auth/components/AdminGuard";
import { AdminProviders } from "@/features/providers/components/AdminProviders";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
        <SvgBG />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <SidebarProvider>
            <AdminSidebar className="overflow-hidden" />
            <SidebarInset>
              <motion.header
                variants={itemVariants}
                className="flex h-16 shrink-0 items-center gap-2 border-b px-4"
              >
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumbs />
              </motion.header>
              <motion.div variants={itemVariants}>
                <AdminProviders />
              </motion.div>
            </SidebarInset>
          </SidebarProvider>
        </motion.div>
      </div>
    </AdminGuard>
  );
}
