import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  const table = useReactTable({
    data,
    columns,
    state: {
      ...(sorting && { sorting }),
      ...(columnFilters && { columnFilters }),
      ...(typeof pageIndex === "number" &&
        typeof pageSize === "number" && {
          pagination: { pageIndex, pageSize },
        }),
    },
    manualSorting: !!onSortingChange,
    manualFiltering: !!onColumnFiltersChange,
    manualPagination: !!onPaginationChange,
    ...(pageCount !== undefined && { pageCount }),

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    ...(onSortingChange && { onSortingChange }),
    ...(onColumnFiltersChange && { onColumnFiltersChange }),
    ...(onPaginationChange && { onPaginationChange }),

    autoResetPageIndex: false,
  });

  return (
    <div className="space-y-4">
      {searchKey && onColumnFiltersChange && (
        <Input
          placeholder="Search..."
          disabled={isLoading}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            onColumnFiltersChange((old) => {
              const updatedFilters = old.map((f) =>
                f.id === searchKey ? { ...f, value: e.target.value } : f
              );
              if (!old.find((f) => f.id === searchKey)) {
                updatedFilters.push({ id: searchKey, value: e.target.value });
              }
              return updatedFilters;
            })
          }
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
                        header.getContext()
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

      {onPaginationChange &&
        pageCount !== undefined &&
        pageIndex !== undefined && (
          <div className="flex items-center justify-end space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onPaginationChange((old) => ({
                  ...old,
                  pageIndex: Math.max(old.pageIndex - 1, 0),
                }))
              }
              disabled={!table.getCanPreviousPage() || isLoading}
            >
              Previous
            </Button>

            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>
            </span>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onPaginationChange((old) => ({
                  ...old,
                  pageIndex: Math.min(
                    old.pageIndex + 1,
                    table.getPageCount() - 1
                  ),
                }))
              }
              disabled={!table.getCanNextPage() || isLoading}
            >
              Next
            </Button>
          </div>
        )}
    </div>
  );
}
