import { setCookie } from "@/utils/cookie";
import type { AuthResponse } from "../@types";
import { authApi } from "./api/authApi";

const ACCESS_TOKEN_EXPIRY = 60 * 60;
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30;
const PERSISTENT_REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 365;
const REFRESH_THRESHOLD = 5 * 60;

export class InvalidOrExpiredRefreshTokenError extends Error {
	constructor(message = "Refresh token is invalid or expired.") {
		super(message);
		this.name = "InvalidOrExpiredRefreshTokenError";
	}
}

export class NetworkErrorDuringRefresh extends Error {
	constructor(message = "A network error occurred during token refresh.") {
		super(message);
		this.name = "NetworkErrorDuringRefresh";
	}
}

export class NoTokensFoundError extends Error {
	constructor(message = "No valid tokens found.") {
		super(message);
		this.name = "NoTokensFoundError";
	}
}

export const storeTokens = (
	tokens: Pick<AuthResponse, "accessToken" | "refreshToken">,
	keepLoggedIn = false,
) => {
	const now = Math.floor(Date.now() / 1000);

	localStorage.setItem("accessToken", tokens.accessToken);
	localStorage.setItem("refreshToken", tokens.refreshToken);
	localStorage.setItem("accessTokenExpiry", String(now + ACCESS_TOKEN_EXPIRY));
	localStorage.setItem(
		"refreshTokenExpiry",
		String(
			now +
				(keepLoggedIn ? PERSISTENT_REFRESH_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY),
		),
	);
	localStorage.setItem("keepLoggedIn", String(keepLoggedIn));

	setCookie("accessToken", tokens.accessToken, {
		maxAge: ACCESS_TOKEN_EXPIRY,
		secure: true,
		sameSite: "Strict",
		path: "/",
	});
};

export const clearTokens = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("accessTokenExpiry");
	localStorage.removeItem("refreshTokenExpiry");
	localStorage.removeItem("keepLoggedIn");
	document.cookie =
		"accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
};

export const refreshTokens = async (): Promise<
	Pick<AuthResponse, "accessToken" | "refreshToken"> | undefined
> => {
	const refreshToken = localStorage.getItem("refreshToken");
	const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

	if (!refreshToken) {
		throw new NoTokensFoundError(
			"No refresh token available to attempt refresh.",
		);
	}

	try {
		const response = await authApi.refresh(refreshToken);

		if (response.success && response.data) {
			const { accessToken, refreshToken: newRefreshToken } = response.data;
			storeTokens({ accessToken, refreshToken: newRefreshToken }, keepLoggedIn);
			return { accessToken, refreshToken: newRefreshToken };
		} else {
			throw new Error(
				response.message || "Token refresh failed: Invalid response data",
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new NetworkErrorDuringRefresh(
				`Token refresh failed: ${error.message}`,
			);
		}
	}
};

export const getAccessToken = async (): Promise<string> => {
	const accessToken = localStorage.getItem("accessToken");
	const expiryTimestamp = localStorage.getItem("accessTokenExpiry");
	const refreshToken = localStorage.getItem("refreshToken");

	if (!accessToken || !expiryTimestamp) {
		if (refreshToken) {
			try {
				const newTokens = await refreshTokens();
				if (newTokens?.accessToken) {
					return newTokens.accessToken;
				} else {
					throw new Error("Refresh succeeded but yielded no token.");
				}
			} catch (error) {
				if (error instanceof InvalidOrExpiredRefreshTokenError) {
					clearTokens();
				}
				throw error;
			}
		} else {
			throw new NoTokensFoundError();
		}
	}

	const now = Math.floor(Date.now() / 1000);
	const expiry = parseInt(expiryTimestamp, 10);

	if (now <= expiry - REFRESH_THRESHOLD) {
		return accessToken;
	}

	if (!refreshToken) {
		clearTokens();
		throw new NoTokensFoundError(
			"Access token expired, but no refresh token found.",
		);
	}

	try {
		const newTokens = await refreshTokens();
		if (newTokens?.accessToken) {
			return newTokens.accessToken;
		} else {
			throw new Error("Refresh succeeded but yielded no token.");
		}
	} catch (error) {
		if (error instanceof InvalidOrExpiredRefreshTokenError) {
			clearTokens();
		}
		throw error;
	}
};

export const isAuthenticated = async (): Promise<boolean> => {
	try {
		await getAccessToken();
		return true;
	} catch (error) {
		if (
			error instanceof NoTokensFoundError ||
			error instanceof InvalidOrExpiredRefreshTokenError
		) {
			return false;
		}
		return false;
	}
};
