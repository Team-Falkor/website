import { constants } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const { API_URL } = constants;

export type DataRetentionPolicy = {
  dataType: string;
  retentionDays: number;
  lastCleanup: string;
};

export function useAdminDataRetention(skip = 0, take = 10) {
  // helper to fetch & unwrap `.data`
  const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error((await res.text()) || res.statusText);
    return (await res.json()).data as T;
  };

  const retentionQuery = useQuery({
    queryKey: ["admin:data-retention", skip, take],
    queryFn: () => {
      const params = new URLSearchParams({
        skip: String(skip),
        take: String(take),
      });
      return fetchJson<DataRetentionPolicy[]>(
        `${API_URL}/analytics/admin/retention?${params}`
      );
    },
  });

  const updateRetention = useMutation({
    mutationFn: (body: { dataType: string; retentionDays: number }) =>
      fetchJson<DataRetentionPolicy>(`${API_URL}/analytics/admin/retention`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    onSuccess: () => retentionQuery.refetch(),
  });

  return {
    retentionSettings: retentionQuery.data,
    isLoadingRetention: retentionQuery.isLoading,
    isErrorRetention: retentionQuery.isError,
    retentionError: retentionQuery.error,
    refetchRetention: retentionQuery.refetch,

    updateRetention: updateRetention.mutate,
    isUpdatingRetention: updateRetention.isPending,
    isErrorUpdatingRetention: updateRetention.isError,
    updateRetentionError: updateRetention.error,
  };
}
