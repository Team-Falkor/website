/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAdminProviders } from "../hooks/useAdminProviders";
import { PendingProviderCard } from "./cards/pendingProviderCard";

export function AdminProviders() {
  const { pendingProviders, isLoading, error } = useAdminProviders({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    console.log(pendingProviders);
  }, [pendingProviders]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !pendingProviders) {
    return (
      <div className="p-4 text-red-500">
        Error loading pending providers. Please try again.
      </div>
    );
  }

  if (!pendingProviders?.success && pendingProviders?.message) {
    return <div className="p-4 text-red-500">{pendingProviders?.message}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Pending Providers</h2>
      {pendingProviders?.data?.length === 0 ? (
        <p className="text-muted-foreground">No pending providers found.</p>
      ) : (
        <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pendingProviders?.data?.map((provider) => (
            <PendingProviderCard key={provider.id} {...provider} />
          ))}
        </div>
      )}
    </div>
  );
}
