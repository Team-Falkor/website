import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { APIResponse } from "@team-falkor/shared-types";
import { useEffect } from "react";
import { toast } from "sonner";
import type { MeResponse } from "../@types";
import { authApi } from "../utils/api/authApi";
import { clearTokens, getAccessToken } from "../utils/tokenManager";

export const useMe = () => {
  const navigate = useNavigate();

  const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

  const query = useQuery<APIResponse<MeResponse>, Error>({
    queryKey: ["me"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) {
        toast.error("No access token available");
        throw new Error("No access token available");
      }
      return authApi.me(token);
    },
    retry: 1,
    enabled: true, // Always enabled, getAccessToken will handle token refreshing
    refetchInterval: keepLoggedIn ? 30 * 60 * 1000 : 5 * 60 * 1000, // Refetch every 30 minutes for persistent sessions, 5 minutes for regular sessions
    refetchOnWindowFocus: !keepLoggedIn, // Only refetch on window focus for non-persistent sessions
  });

  useEffect(() => {
    if (query.isError) {
      console.log("query.error", query.error);
      // Only redirect to login if the error is related to authentication
      // This prevents unnecessary redirects for other types of errors
      if (
        query.error?.message?.includes("unauthorized") ||
        query.error?.message?.includes("Unauthorized") ||
        query.error?.message?.includes("No access token available")
      ) {
        // Use the clearTokens function to remove all tokens
        clearTokens();
        navigate({ to: "/login" });
      }
    }
  }, [navigate, query.isError, query.error]);

  return {
    user: query.data?.data?.user,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};
