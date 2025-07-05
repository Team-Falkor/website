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
import type { PageView } from "../hooks/admin/useAdminPageviews";

interface PageviewsTableProps {
	pageviews?: PageView[] | null | undefined;
	pageCount: number;
	pagination: PaginationState;
	onPaginationChange: OnChangeFn<PaginationState>;
	isLoading?: boolean;
}

export function PageviewsTable({
	pageviews = [],
	pageCount,
	pagination,
	onPaginationChange,
	isLoading = false,
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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Pageviews</CardTitle>
				<CardDescription>
					A list of recent page visits tracked across the application.
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
