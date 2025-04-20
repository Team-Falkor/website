import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { APIResponse } from "@team-falkor/shared-types";
import { toast } from "sonner";
import type { AuthResponse, SignUpBody } from "../@types";
import { authApi, AuthError } from "../utils/api/authApi";

export const useSignUp = () => {
  const navigate = useNavigate();

  const mutation = useMutation<
    APIResponse<Pick<AuthResponse, "user">>,
    AuthError | Error,
    SignUpBody
  >({
    mutationFn: (data) => authApi.signUp(data),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message || "Failed to sign up");
        return;
      }
      toast.success(
        res.message || "Account created successfully! Please log in."
      );
      navigate({ to: "/login" });
    },
    onError: (error) => {
      if (error instanceof AuthError && error.code === "P2002") {
        toast.error("The email address provided already exists.");
      } else {
        const message =
          (error instanceof AuthError && error.message) ||
          (error as Error)?.message ||
          "Failed to sign up";
        toast.error(message);
      }
    },
  });

  return {
    signUp: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
