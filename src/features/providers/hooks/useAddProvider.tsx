import { PluginSetupJSON } from "@/@types/providers";
import { useMutation } from "@tanstack/react-query";
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
        toast.error("Failed to add provider");
        return;
      }

      toast.success("Provider added successfully");
    },
    onError: () => {
      toast.error("Failed to add provider");
    },
  });

  return {
    addProvider: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
