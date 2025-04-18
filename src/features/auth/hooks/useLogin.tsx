import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { APIResponse } from "@team-falkor/shared-types";
import { toast } from "sonner";
import type { AuthResponse, LoginBody } from "../@types";
import { authApi } from "../utils/api/authApi";
import { storeTokens } from "../utils/tokenManager";

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation<APIResponse<AuthResponse>, Error, LoginBody>({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error("failed to login");
        return;
      }

      const { data } = res;

      if (!data) {
        toast.error("failed to login");
        return;
      }

      // Store tokens with expiration timestamps
      storeTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      toast.success("logged in succesfully");

      navigate({ to: "/" });
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
