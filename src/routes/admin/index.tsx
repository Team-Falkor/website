import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <AdminGuard>
      <SidebarProvider>
        <AdminSidebar className="overflow-hidden" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumbs />
          </header>
          <AdminProviders />
        </SidebarInset>
      </SidebarProvider>
    </AdminGuard>
  );
}
