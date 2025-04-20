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
          toast.error(res.message || "Failed to login");
          return;
        }
        const { data } = res;
        if (!data) {
          toast.error("Login successful, but no data received.");
          return;
        }
        toast.success(res.message || "Logged in successfully");
        navigate({ to: "/" });
      },
      onError: (error) => {
        let message = "Failed to login";
        if (typeof error === "object" && error !== null) {
          if (
            "response" in error &&
            typeof error.response === "object" &&
            error.response !== null &&
            "data" in error.response &&
            typeof error.response.data === "object" &&
            error.response.data !== null &&
            "message" in error.response.data &&
            typeof error.response.data.message === "string"
          ) {
            message = error.response.data.message;
          } else if ("message" in error && typeof error.message === "string") {
            message = error.message;
          }
        }
        toast.error(message);
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
