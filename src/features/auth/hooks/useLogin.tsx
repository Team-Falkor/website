import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { APIResponse } from "@team-falkor/shared-types";
import { toast } from "sonner";
import type { AuthResponse, LoginBody } from "../@types";
import { authApi } from "../utils/api/authApi";
import { storeTokens } from "../utils/tokenManager";

interface LoginFormData extends LoginBody {
  keepLoggedIn: boolean;
}

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation<APIResponse<AuthResponse>, Error, LoginFormData>(
    {
      mutationFn: async (credentials) => {
        const { keepLoggedIn, ...loginCredentials } = credentials;
        const response = await authApi.login(loginCredentials);
        if (response.success && response.data) {
          storeTokens(response.data, keepLoggedIn);
        }
        return response;
      },
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
    }
  );

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
