import { constants } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@team-falkor/shared-types";

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
  const fetchJson = async <T>(url: string): Promise<ApiResponse<T>> => {
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res.ok) throw new Error((await res.text()) || res.statusText);
    return (await res.json()) as ApiResponse<T>;
  };

  const queryKey = ["admin:pageviews", skip, take, path ?? ""];

  const pageviewsQuery = useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams({
        skip: String(skip),
        take: String(take),
      });
      if (path) params.append("path", path);
      return fetchJson<PageView[]>(
        `${API_URL}/analytics/admin/pageviews?${params}`
      );
    },
  });

  return {
    pageviews: pageviewsQuery.data,
    isLoadingPageviews: pageviewsQuery.isLoading,
    isErrorPageviews: pageviewsQuery.isError,
    pageviewsError: pageviewsQuery.error,
    refetchPageviews: pageviewsQuery.refetch,
  };
}
