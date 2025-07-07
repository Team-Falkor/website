import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];

	/** Optional pagination props */
	pageCount?: number;
	pageIndex?: number;
	pageSize?: number;
	onPaginationChange?: OnChangeFn<PaginationState>;

	/** Optional sorting props */
	sorting?: SortingState;
	onSortingChange?: OnChangeFn<SortingState>;

	/** Optional filtering props */
	columnFilters?: ColumnFiltersState;
	onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

	searchKey?: string;
	isLoading?: boolean;
	isError?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageCount,
	pageIndex,
	pageSize,
	onPaginationChange,
	sorting,
	onSortingChange,
	columnFilters,
	onColumnFiltersChange,
	searchKey,
	isLoading = false,
	isError = false,
}: DataTableProps<TData, TValue>) {
	// Internal state for when external state is not provided
	const [internalSorting, setInternalSorting] = useState<SortingState>([]);
	const [internalColumnFilters, setInternalColumnFilters] =
		useState<ColumnFiltersState>([]);
	const [internalPagination, setInternalPagination] = useState<PaginationState>(
		{
			pageIndex: 0,
			pageSize: 10,
		},
	);

	// Use external state if provided, otherwise use internal state
	const currentSorting = sorting ?? internalSorting;
	const currentColumnFilters = columnFilters ?? internalColumnFilters;
	const currentPagination = {
		pageIndex: pageIndex ?? internalPagination.pageIndex,
		pageSize: pageSize ?? internalPagination.pageSize,
	};
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting: currentSorting,
			columnFilters: currentColumnFilters,
			pagination: currentPagination,
		},
		manualSorting: !!onSortingChange,
		manualFiltering: !!onColumnFiltersChange,
		manualPagination: !!onPaginationChange,
		...(pageCount !== undefined && { pageCount }),

		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),

		onSortingChange: onSortingChange ?? setInternalSorting,
		onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
		onPaginationChange: onPaginationChange ?? setInternalPagination,

		autoResetPageIndex: false,
	});

	return (
		<div className="space-y-4">
			{searchKey && (
				<Input
					placeholder="Search..."
					disabled={isLoading}
					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
					onChange={(e) => {
						const value = e.target.value;
						const column = table.getColumn(searchKey);
						if (column) {
							column.setFilterValue(value);
						}
					}}
					className="max-w-sm"
				/>
			)}

			<div className="rounded-md border">
				{isError && <div className="p-4 text-red-600">Error loading data.</div>}

				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((hg) => (
							<TableRow key={hg.id}>
								{hg.headers.map((header) => (
									<TableHead key={header.id}>
										{!header.isPlaceholder &&
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="text-center">
									Loading…
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{(onPaginationChange || data.length > 10) && (
				<div className="flex items-center justify-between">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length > 0 && (
							<span>
								{table.getFilteredSelectedRowModel().rows.length} of{" "}
								{table.getFilteredRowModel().rows.length} row(s) selected.
							</span>
						)}
					</div>
					<div className="flex items-center space-x-6 lg:space-x-8">
						<div className="flex items-center space-x-2">
							<p className="text-sm font-medium">Rows per page</p>
							<Select
								value={`${table.getState().pagination.pageSize}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}
								disabled={isLoading}
							>
								<SelectTrigger className="h-8 w-[70px]" size="sm">
									<SelectValue
										placeholder={table.getState().pagination.pageSize}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<SelectItem key={pageSize} value={`${pageSize}`}>
											{pageSize}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex w-[100px] items-center justify-center text-sm font-medium">
							Page {table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage() || isLoading}
							>
								First
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage() || isLoading}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage() || isLoading}
							>
								Next
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage() || isLoading}
							>
								Last
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
