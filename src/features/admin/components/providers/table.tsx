import { DataTable } from "@/components/ui/data-table";
import { useAdminProviders } from "@/features/providers/hooks/useAdminProviders";
import { providerColumns } from "../../utils/providerTableColumns";

export const PendingProvidersTable = () => {
	const { pendingProviders, isLoading, error } = useAdminProviders({
		sortBy: "createdAt",
		sortOrder: "desc",
	});

	console.log(pendingProviders); // Remove this line after debugging is complete

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!pendingProviders?.data) {
		return <div>No pending providers</div>;
	}

	return (
		<div>
			<DataTable columns={providerColumns} data={pendingProviders?.data} />
		</div>
	);
};
