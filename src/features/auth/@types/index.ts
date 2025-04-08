export interface LoginBody {
  email: string;
  password: string;
}

export interface SignUpBody extends LoginBody {
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface ErrorResponse {
  message: string;
  code?: string;
}

export interface MeResponse {
  user: {
    id: string;
    email: string;
    username: string;
    isOnline: boolean;
    role: "USER" | "ADMIN";
    emailVerified: boolean;
    resetToken: string | null;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
