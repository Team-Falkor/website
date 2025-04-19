"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import type { PageView } from "../hooks/admin/useAdminPageviews";

interface PageviewsTableProps {
  pageviews: PageView[] | null | undefined;
}

export function PageviewsTable({ pageviews }: PageviewsTableProps) {
  // Ensure we always pass an array
  const data: PageView[] = pageviews ?? [];

  // Define columns for DataTable with precise string types
  const columns: ColumnDef<PageView, string>[] = [
    {
      accessorKey: "path",
      header: "Path",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "deviceType",
      header: () => <span className="hidden sm:table-cell">Device</span>,
      cell: (info) => (
        <span className="hidden sm:table-cell">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "browser",
      header: () => <span className="hidden md:table-cell">Browser</span>,
      cell: (info) => (
        <span className="hidden md:table-cell">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "country",
      header: () => <span className="hidden lg:table-cell">Country</span>,
      cell: (info) => (
        <span className="hidden lg:table-cell">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
