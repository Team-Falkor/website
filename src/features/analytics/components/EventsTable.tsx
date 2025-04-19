import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import type { EventLog } from "../hooks/admin/useAdminEvents";

interface EventsTableProps {
  events: EventLog[] | null | undefined;
}

export function EventsTable({ events }: EventsTableProps) {
  const data: EventLog[] = events ?? [];

  const columns: ColumnDef<EventLog, string>[] = [
    {
      accessorKey: "eventType",
      header: "Event Type",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "path",
      header: "Path",
    },
    {
      accessorKey: "sessionId",
      header: () => <span className="hidden md:table-cell">Session ID</span>,
      cell: (info) => (
        <span className="hidden md:table-cell">{info.getValue()}</span>
      ),
    },
    {
      id: "context",
      accessorFn: (row) => JSON.stringify(row.context).substring(0, 30) + "...",
      header: () => <span className="hidden lg:table-cell">Context</span>,
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
