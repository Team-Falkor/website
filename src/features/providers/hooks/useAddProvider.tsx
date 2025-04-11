import { useMutation } from "@tanstack/react-query";
import { PluginSetupJSON } from "@team-falkor/shared-types";
import { toast } from "sonner";
import { providersApi } from "../utils/api/providersApi";

type AddProviderParams = {
  setupJSON?: PluginSetupJSON;
  setupUrl?: string;
};

export const useAddProvider = () => {
  const mutation = useMutation({
    mutationFn: (data: AddProviderParams) => providersApi.addProvider(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error("Failed to add provider", {
          description: res.message,
        });
        return;
      }

      toast.success("Provider added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add provider", {
        description: error.message,
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
