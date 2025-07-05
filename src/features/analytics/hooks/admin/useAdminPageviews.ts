import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { ApiResponse } from "@team-falkor/shared-types";
import { constants } from "@/utils";

const { API_URL } = constants;

export type PageView = {
	id: string;
	path: string;
	sessionId: string;
	deviceType: string;
	browser: string;
	country: string;
	timestamp: string;
};

export function useAdminPageviews(skip = 0, take = 50, path?: string) {
	return useAdminPageviewsWithPagination({ skip, take, path });
}

// Enhanced version that works with TanStack Table pagination
export function useAdminPageviewsWithPagination({
	skip = 0,
	take = 50,
	path,
	pagination,
}: {
	skip?: number;
	take?: number;
	path?: string;
	pagination?: PaginationState;
} = {}) {
	// Use pagination state if provided, otherwise fall back to skip/take
	const actualSkip = pagination
		? pagination.pageIndex * pagination.pageSize
		: skip;
	const actualTake = pagination?.pageSize ?? take;
	const fetchJson = async <T>(url: string): Promise<ApiResponse<T>> => {
		const res = await fetch(url, {
			credentials: "include",
		});
		if (!res.ok) throw new Error((await res.text()) || res.statusText);
		return (await res.json()) as ApiResponse<T>;
	};

	const queryKey = pagination
		? ["admin:pageviews", pagination.pageIndex, pagination.pageSize, path ?? ""]
		: ["admin:pageviews", actualSkip, actualTake, path ?? ""];

	const pageviewsQuery = useQuery({
		queryKey,
		queryFn: () => {
			const params = new URLSearchParams({
				skip: String(actualSkip),
				take: String(actualTake),
			});
			if (path) params.append("path", path);
			return fetchJson<PageView[]>(
				`${API_URL}/analytics/admin/pageviews?${params}`,
			);
		},
		placeholderData: keepPreviousData,
	});

	return {
		pageviews: pageviewsQuery.data,
		isLoadingPageviews: pageviewsQuery.isLoading,
		isErrorPageviews: pageviewsQuery.isError,
		pageviewsError: pageviewsQuery.error,
		refetchPageviews: pageviewsQuery.refetch,
	};
}
