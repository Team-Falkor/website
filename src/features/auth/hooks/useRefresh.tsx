import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ApiResponse } from "@team-falkor/shared-types";
import { toast } from "sonner";
import type { AuthResponse } from "../@types";
import { authApi } from "../utils/api/authApi";
import { clearTokens, storeTokens } from "../utils/tokenManager";

export const useRefresh = () => {
  const navigate = useNavigate();

  const mutation = useMutation<ApiResponse<AuthResponse>, Error, void>({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        toast.error("No refresh token available");
        throw new Error("No refresh token available");
      }
      return authApi.refresh(refreshToken);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error("failed to refresh token");
        return;
      }
      const { data } = res;

      if (!data) {
        toast.error("failed to refresh token");
        return;
      }

      storeTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    },
    onError: () => {
      // Clear tokens and redirect to login on refresh failure
      clearTokens();
      navigate({ to: "/login" });
    },
  });

  return {
    refresh: () => mutation.mutate(),
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
