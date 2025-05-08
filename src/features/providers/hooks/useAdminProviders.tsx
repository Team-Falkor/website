import { useMutation, useQuery } from "@tanstack/react-query";
import { providersAdminApi } from "../utils/api/providersAdminApi";

type UseAdminProvidersParams = {
	skip?: number;
	take?: number;
	sortBy?: "createdAt" | "name";
	sortOrder?: "asc" | "desc";
};

export const useAdminProviders = (params?: UseAdminProvidersParams) => {
	const pendingProvidersQuery = useQuery({
		queryKey: ["pending-providers", params],
		queryFn: () => providersAdminApi.getPendingProviders(params),
	});

	const deleteProviderMutation = useMutation({
		mutationFn: (id: string) => providersAdminApi.deleteProvider(id),
		onSuccess: () => {
			// Refetch pending providers after successful deletion
			pendingProvidersQuery.refetch();
		},
	});

	const approveProviderMutation = useMutation({
		mutationFn: (id: string) => providersAdminApi.approveProvider(id),
		onSuccess: () => {
			// Refetch pending providers after successful approval
			pendingProvidersQuery.refetch();
		},
	});

	return {
		pendingProviders: pendingProvidersQuery.data,
		isLoading: pendingProvidersQuery.isLoading,
		error: pendingProvidersQuery.error,
		isError: pendingProvidersQuery.isError,
		refetch: pendingProvidersQuery.refetch,
		deleteProvider: deleteProviderMutation.mutate,
		isDeletingProvider: deleteProviderMutation.isPending,
		deleteError: deleteProviderMutation.error,
		approveProvider: approveProviderMutation.mutate,
		isApprovingProvider: approveProviderMutation.isPending,
		approveError: approveProviderMutation.error,
	};
};
