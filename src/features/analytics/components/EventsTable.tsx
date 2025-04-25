"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import * as React from "react";
import type { EventLog } from "../hooks/admin/useAdminEvents";

interface EventsTableProps {
  events: EventLog[] | null | undefined;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
}

export function EventsTable({
  events,
  pageCount,
  onPageChange,
}: EventsTableProps) {
  const data = events ?? [];

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

  // Local state for sorting, filtering, pagination
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    onPageChange(pagination.pageIndex);
  }, [pagination.pageIndex, onPageChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
        <CardDescription>
          A list of recent events tracked across the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          sorting={sorting}
          columnFilters={columnFilters}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onSortingChange={setSorting}
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          searchKey="path"
          pageCount={pageCount}
        />
      </CardContent>
    </Card>
  );
}
