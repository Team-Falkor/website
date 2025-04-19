import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { authApi } from "../utils/api/authApi";
import {
  clearTokens,
  getAccessToken,
  InvalidOrExpiredRefreshTokenError,
  NetworkErrorDuringRefresh,
  NoTokensFoundError,
} from "../utils/tokenManager";

class UnauthorizedApiCallError extends Error {
  constructor(message = "API call was unauthorized.") {
    super(message);
    this.name = "UnauthorizedApiCallError";
  }
}

export const useMe = () => {
  const navigate = useNavigate();
  const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const token = await getAccessToken();
        const response = await authApi.me(token);

        if (response.success === false) {
          throw new UnauthorizedApiCallError(
            `API rejected the token for /me. Status: ${response.message}`
          );
        }
        if (!response.success) {
          throw new Error(
            response.message ||
              `API call for /me failed with status ${response.message}`
          );
        }
        return response;
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : "An unknown error occurred."
        );
      }
    },
    retry: (failureCount, error) => {
      if (
        error instanceof InvalidOrExpiredRefreshTokenError ||
        error instanceof NoTokensFoundError ||
        error instanceof UnauthorizedApiCallError
      ) {
        return false;
      }
      return failureCount < 1;
    },
    enabled: true,
    refetchInterval: keepLoggedIn ? 30 * 60 * 1000 : 5 * 60 * 1000,
    refetchOnWindowFocus: !keepLoggedIn,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      let shouldClearTokensAndRedirect = false;
      let isTemporaryError = false;
      let toastMessage = "An unexpected error occurred. Please try again.";

      if (
        query.error instanceof InvalidOrExpiredRefreshTokenError ||
        query.error instanceof NoTokensFoundError ||
        query.error instanceof UnauthorizedApiCallError
      ) {
        shouldClearTokensAndRedirect = true;
        toastMessage =
          "Your session has expired or is invalid. Please log in again.";
      } else if (query.error instanceof NetworkErrorDuringRefresh) {
        isTemporaryError = true;
        toastMessage = `Network issue during session refresh: ${query.error.message}`;
      } else if (
        query.error.message?.includes("fetch") ||
        query.error.message?.includes("Network")
      ) {
        isTemporaryError = true;
        toastMessage = `Network error fetching user data: ${query.error.message}`;
      } else {
        shouldClearTokensAndRedirect = true;
        toastMessage = `An unexpected error occurred (${query.error.name}): ${query.error.message}`;
      }

      if (shouldClearTokensAndRedirect) {
        clearTokens();
        toast.error(toastMessage);
        if (window.location.pathname !== "/login") {
          navigate({ to: "/login", replace: true });
        }
      } else if (isTemporaryError) {
        if (keepLoggedIn) {
          toast.warning(toastMessage);
        } else {
          clearTokens();
          toast.error("Session error. Please log in again.");
          if (window.location.pathname !== "/login") {
            navigate({ to: "/login", replace: true });
          }
        }
      }
    }
  }, [navigate, query.isError, query.error, keepLoggedIn]);

  return {
    user: query.data?.data?.user,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};
