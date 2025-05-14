import { User } from "./user";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  twoFactorCode?: string;
  twoFactorRecoveryCode?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  tokenType?: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface InfoResponse {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isEmailConfirmed: boolean;
  location?: string;
  bio?: string;
  skills?: string[];
  stats?: {
    events: number;
    hours: number;
    organizations: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface InfoRequest {
  newEmail?: string;
  newPassword?: string;
  oldPassword?: string;
}

export interface HttpValidationProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}
