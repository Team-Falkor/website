import { setCookie } from "@/utils/cookie";
import { AuthResponse } from "../@types";
import { authApi } from "./api/authApi";

// Token expiration times in seconds
const ACCESS_TOKEN_EXPIRY = 60 * 60; // 1 hour
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30; // 30 days
const PERSISTENT_REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 365; // 1 year

// Time before expiration to refresh token (in seconds)
const REFRESH_THRESHOLD = 5 * 60; // 5 minutes

// Store tokens with expiration timestamps
export const storeTokens = (
  tokens: Pick<AuthResponse, "accessToken" | "refreshToken">,
  keepLoggedIn = false
) => {
  const now = Math.floor(Date.now() / 1000);

  // Store tokens in localStorage with expiration timestamps
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
  localStorage.setItem("accessTokenExpiry", String(now + ACCESS_TOKEN_EXPIRY));
  localStorage.setItem(
    "refreshTokenExpiry",
    String(
      now +
        (keepLoggedIn ? PERSISTENT_REFRESH_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY)
    )
  );
  localStorage.setItem("keepLoggedIn", String(keepLoggedIn));

  // Also store access token in cookie for API requests
  setCookie("accessToken", tokens.accessToken, {
    maxAge: ACCESS_TOKEN_EXPIRY,
    secure: true,
    sameSite: "Strict",
  });
};

// Clear all stored tokens
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiry");
  localStorage.removeItem("refreshTokenExpiry");
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

// Get access token and refresh if needed
export const getAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem("accessToken");
  const expiryTimestamp = localStorage.getItem("accessTokenExpiry");

  if (!accessToken || !expiryTimestamp) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const expiry = parseInt(expiryTimestamp, 10);

  // If token is expired or close to expiring, try to refresh it
  if (now > expiry - REFRESH_THRESHOLD) {
    try {
      const newTokens = await refreshTokens();
      return newTokens?.accessToken || null;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }

  return accessToken;
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAccessToken();
  return !!token;
};

// Refresh tokens using the refresh token
export const refreshTokens = async (): Promise<Pick<
  AuthResponse,
  "accessToken" | "refreshToken"
> | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await authApi.refresh(refreshToken);

    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data;
      storeTokens({ accessToken, refreshToken });
      return { accessToken, refreshToken };
    }

    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearTokens();
    return null;
  }
};
