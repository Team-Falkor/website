"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  /** total number of pages (for server-side mode) */
  pageCount?: number;
  /** callback for when pageIndex changes */
  onPageChange?: (pageIndex: number) => void;
  /** rows per page (optional) */
  initialPageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  pageCount,
  onPageChange,
  initialPageSize = 10,
}: DataTableProps<TData, TValue>) {
  // 1) Sorting & filtering state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // 2) Full pagination state (index + size)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // 3) Build the table
  const table = useReactTable({
    data,
    columns,

    // register row models
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // ← pagination row model :contentReference[oaicite:2]{index=2}

    // controlled state
    state: {
      sorting,
      columnFilters,
      pagination,
    },

    // change handlers
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    // for server-side mode:
    manualPagination: Boolean(pageCount),
    pageCount,

    // optionally turn on/off auto reset:
    autoResetPageIndex: false,
  });

  // 4) Notify parent when pageIndex changes
  React.useEffect(() => {
    onPageChange?.(pagination.pageIndex);
  }, [pagination.pageIndex, onPageChange]);

  return (
    <div>
      {/* Search input */}
      {searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn(searchKey)?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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

      {/* Pagination controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page{" "}
          <strong>
            {pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            table.setPageIndex((old) =>
              Math.min(old + 1, table.getPageCount() - 1)
            )
          }
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
