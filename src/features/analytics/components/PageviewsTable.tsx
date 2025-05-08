"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";
import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { PageView } from "../hooks/admin/useAdminPageviews";

interface PageviewsTableProps {
	pageviews: PageView[] | null | undefined;
	pageCount: number;
	onPageChange: (pageIndex: number) => void;
}

export function PageviewsTable({
	pageviews,
	pageCount,
	onPageChange,
}: PageviewsTableProps) {
	const data: PageView[] = pageviews ?? [];

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

	// Local state for table controls
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	// call onPageChange whenever pageIndex updates
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
					pageCount={pageCount}
					pageIndex={pagination.pageIndex}
					pageSize={pagination.pageSize}
					sorting={sorting}
					columnFilters={columnFilters}
					onSortingChange={setSorting}
					onColumnFiltersChange={setColumnFilters}
					onPaginationChange={setPagination}
					searchKey="path"
				/>
			</CardContent>
		</Card>
	);
}
