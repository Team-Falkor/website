import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { ApiResponse } from "@team-falkor/shared-types";
import { constants } from "@/utils";

const { API_URL } = constants;

export type EventLog = {
	id: string;
	eventType: string;
	path: string;
	sessionId: string;
	context: unknown;
	timestamp: string;
};

export function useAdminEvents(
	skip = 0,
	take = 50,
	eventType?: string,
	path?: string,
) {
	return useAdminEventsWithPagination({ skip, take, eventType, path });
}

// Enhanced version that works with TanStack Table pagination
export function useAdminEventsWithPagination({
	skip = 0,
	take = 50,
	eventType,
	path,
	pagination,
}: {
	skip?: number;
	take?: number;
	eventType?: string;
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
		? [
				"admin:events",
				pagination.pageIndex,
				pagination.pageSize,
				eventType ?? "",
				path ?? "",
			]
		: ["admin:events", actualSkip, actualTake, eventType ?? "", path ?? ""];

	const eventsQuery = useQuery({
		queryKey,
		placeholderData: keepPreviousData,
		queryFn: () => {
			const params = new URLSearchParams({
				skip: String(actualSkip),
				take: String(actualTake),
			});
			if (eventType) params.append("eventType", eventType);
			if (path) params.append("path", path);
			return fetchJson<EventLog[]>(
				`${API_URL}/analytics/admin/events?${params}`,
			);
		},
	});

	return {
		events: eventsQuery.data,
		isLoadingEvents: eventsQuery.isLoading,
		isErrorEvents: eventsQuery.isError,
		eventsError: eventsQuery.error,
		refetchEvents: eventsQuery.refetch,
	};
}
