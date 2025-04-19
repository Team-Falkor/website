import { constants } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const { API_URL } = constants;

export type AggregateMetric = {
  id: string;
  metricType: string;
  value: number;
  period: string;
  startTime: string;
  endTime: string;
};

export function useAdminMetrics(
  metricType?: string,
  period?: string,
  startTime?: string,
  endTime?: string
) {
  const fetchJson = async <T>(url: string): Promise<T> => {
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res.ok) throw new Error((await res.text()) || res.statusText);
    return (await res.json()).data as T;
  };

  const queryKey = [
    "admin:metrics",
    metricType ?? "",
    period ?? "",
    startTime ?? "",
    endTime ?? "",
  ];

  const metricsQuery = useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      if (metricType) params.append("metricType", metricType);
      if (period) params.append("period", period);
      if (startTime) params.append("startTime", startTime);
      if (endTime) params.append("endTime", endTime);
      return fetchJson<AggregateMetric[]>(
        `${API_URL}/analytics/admin/metrics?${params}`
      );
    },
  });

  return {
    metrics: metricsQuery?.data?.map((metric) => ({
      ...metric,
      startTime: new Date(metric.startTime).toLocaleString(),
      endTime: new Date(metric.endTime).toLocaleString(),
      value: metric.value ?? 0,
    })),
    isLoadingMetrics: metricsQuery.isLoading,
    isErrorMetrics: metricsQuery.isError,
    metricsError: metricsQuery.error,
    refetchMetrics: metricsQuery.refetch,
  };
}
