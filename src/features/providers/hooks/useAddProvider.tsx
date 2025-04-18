import { useMutation } from "@tanstack/react-query";
import { APIResponse, PluginSetupJSON } from "@team-falkor/shared-types";
import { toast } from "sonner";
import { providersApi } from "../utils/api/providersApi";

type AddProviderParams = {
  setupJSON?: PluginSetupJSON;
  setupUrl?: string;
};

type AddProviderResponse = APIResponse<PluginSetupJSON>;

export const useAddProvider = () => {
  const mutation = useMutation<AddProviderResponse, Error, AddProviderParams>({
    mutationFn: (data: AddProviderParams) => providersApi.addProvider(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error("Failed to add provider", {
          description: res.message || "An unexpected error occurred.",
        });
        return;
      }

      toast.success("Provider added successfully");
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast.error("Failed to add provider", {
        description: errorMessage,
      });
    },
  });

  return {
    addProvider: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
