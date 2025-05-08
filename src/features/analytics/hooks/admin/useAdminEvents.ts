import { useQuery } from "@tanstack/react-query";
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
	const fetchJson = async <T>(url: string): Promise<ApiResponse<T>> => {
		const res = await fetch(url, {
			credentials: "include",
		});
		if (!res.ok) throw new Error((await res.text()) || res.statusText);
		return (await res.json()) as ApiResponse<T>;
	};

	const queryKey = ["admin:events", skip, take, eventType ?? "", path ?? ""];

	const eventsQuery = useQuery({
		queryKey,
		queryFn: () => {
			const params = new URLSearchParams({
				skip: String(skip),
				take: String(take),
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
