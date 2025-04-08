import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { AuthResponse, SignUpBody } from "../@types";
import { authApi, AuthError } from "../utils/api/authApi";
import { storeTokens } from "../utils/tokenManager";
import { APIResponse } from "@/@types";

export const useSignUp = () => {
  const navigate = useNavigate();

  const mutation = useMutation<APIResponse<AuthResponse>, Error, SignUpBody>({
    mutationFn: (data) => authApi.signUp(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error("failed to sign up");
        return;
      }

      const { data } = res;

      if (!data) {
        toast.error("failed to refresh token");
        return;
      }

      // Store tokens with expiration timestamps
      storeTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      // Navigate to home page after successful registration
      navigate({ to: "/" });
    },
  });

  const isDuplicateEmail =
    mutation.error instanceof AuthError && mutation.error.code === "P2002";

  return {
    signUp: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isDuplicateEmail,
  };
};
