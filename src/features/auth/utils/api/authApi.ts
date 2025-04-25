import { constants } from "@/utils";
import { ApiResponse } from "@team-falkor/shared-types";
import {
  AuthResponse,
  ErrorResponse,
  LoginBody,
  MeResponse,
  SignUpBody,
} from "../../@types";

const { API_URL } = constants;

const API_BASE_URL = `${API_URL}/auth`;

export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = "AuthError";
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new AuthError(error.message, error.code, response.status);
  }
  return response.json();
}

export const authApi = {
  async login(credentials: LoginBody): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },

  async signUp(
    data: SignUpBody
  ): Promise<ApiResponse<Pick<AuthResponse, "user">>> {
    const response = await fetch(`${API_BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async refresh(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },

  async logout(): Promise<ApiResponse<unknown>> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse<unknown>(response);
  },

  async me(token: string): Promise<ApiResponse<MeResponse>> {
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return handleResponse<MeResponse>(response);
  },
};
