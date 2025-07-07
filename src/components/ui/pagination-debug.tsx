import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "./button";

export function PaginationDebug() {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const handleNext = () => {
		setPagination((prev) => ({
			...prev,
			pageIndex: prev.pageIndex + 1,
		}));
	};

	const handlePrev = () => {
		setPagination((prev) => ({
			...prev,
			pageIndex: Math.max(0, prev.pageIndex - 1),
		}));
	};

	const handlePageSizeChange = (newSize: number) => {
		setPagination((prev) => ({
			...prev,
			pageSize: newSize,
			pageIndex: 0, // Reset to first page when changing page size
		}));
	};

	return (
		<div className="p-4 border rounded-lg space-y-4">
			<h3 className="text-lg font-semibold">Pagination Debug</h3>

			<div className="space-y-2">
				<p>
					<strong>Page Index:</strong> {pagination.pageIndex}
				</p>
				<p>
					<strong>Page Size:</strong> {pagination.pageSize}
				</p>
				<p>
					<strong>Skip:</strong> {pagination.pageIndex * pagination.pageSize}
				</p>
				<p>
					<strong>Take:</strong> {pagination.pageSize}
				</p>
			</div>

			<div className="flex gap-2">
				<Button onClick={handlePrev} disabled={pagination.pageIndex === 0}>
					Previous
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</div>

			<div className="flex gap-2">
				<Button
					variant={pagination.pageSize === 10 ? "default" : "outline"}
					onClick={() => handlePageSizeChange(10)}
				>
					10 per page
				</Button>
				<Button
					variant={pagination.pageSize === 20 ? "default" : "outline"}
					onClick={() => handlePageSizeChange(20)}
				>
					20 per page
				</Button>
				<Button
					variant={pagination.pageSize === 50 ? "default" : "outline"}
					onClick={() => handlePageSizeChange(50)}
				>
					50 per page
				</Button>
			</div>
		</div>
	);
}
