import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

// Define the response types for the auth requests
interface AuthResponse {
  message: string;
  token?: string;
  errors?: { msg: string }[];
}

interface SignData {
  username: string;
  password: string;
}

// Helper function to handle sign-up API call
const signUpUser = async (data: SignData): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "Failed to sign up");
  }

  return response.json();
};

// Helper function to handle sign-in API call
const signInUser = async (data: SignData): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "Failed to sign in");
  }

  return response.json();
};

// Custom hook for sign-up
export const useSignUp = (
  options?: UseMutationOptions<AuthResponse, Error, SignData>
): UseMutationResult<AuthResponse, Error, SignData> => {
  return useMutation<AuthResponse, Error, SignData>({
    mutationFn: signUpUser,
    onSuccess: (data, variables, context) => {
      if (data.token) {
        localStorage.setItem("token", data.token); // Store JWT token
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error("Sign-up error:", error.message);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

// Custom hook for sign-in
export const useSignIn = (
  options?: UseMutationOptions<AuthResponse, Error, SignData>
): UseMutationResult<AuthResponse, Error, SignData> => {
  return useMutation<AuthResponse, Error, SignData>({
    mutationFn: signInUser,
    onSuccess: (data, variables, context) => {
      if (data.token) {
        localStorage.setItem("token", data.token); // Store JWT token
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error("Sign-in error:", error.message);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
