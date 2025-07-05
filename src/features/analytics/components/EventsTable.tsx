"use client";

import { ColumnDef, OnChangeFn, PaginationState } from "@tanstack/react-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { EventLog } from "../hooks/admin/useAdminEvents";

interface EventsTableProps {
	events?: EventLog[] | null | undefined;
	pageCount: number;
	pagination: PaginationState;
	onPaginationChange: OnChangeFn<PaginationState>;
	isLoading?: boolean;
}

export function EventsTable({
	events = [],
	pageCount,
	pagination,
	onPaginationChange,
	isLoading = false,
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
					pageIndex={pagination.pageIndex}
					pageSize={pagination.pageSize}
					pageCount={pageCount}
					onPaginationChange={onPaginationChange}
					searchKey="path"
					isLoading={isLoading}
				/>
			</CardContent>
		</Card>
	);
}
