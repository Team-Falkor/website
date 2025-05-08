import { useQuery } from "@tanstack/react-query";
import { providersApi } from "../utils/api/providersApi";

export const useProviders = (params?: {
	limit?: number;
	offset?: number;
	search?: string;
}) => {
	const { data, isLoading, error, isError, refetch } = useQuery({
		queryKey: ["providers", params],
		queryFn: () => providersApi.getProviders(params),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: 1000 * 60 * 10, // 10 minutes
		retry: 0,
	});

	return {
		providers: data,
		isLoading: isLoading,
		error: error,
		isError: isError,
		refetch: refetch,
	};
};
