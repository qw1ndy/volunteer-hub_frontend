import axios from "axios";
import {
  LoginRequest,
  RegisterRequest,
  AccessTokenResponse,
  RefreshRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  InfoResponse,
  InfoRequest,
} from "../types/auth";
import { logger } from "../utils/logger";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7119";

// Тестові дані для демонстрації
const TEST_USER: InfoResponse = {
  id: "test-user-id",
  email: "test@example.com",
  name: "Тестовий Користувач",
  avatar: "https://via.placeholder.com/150",
  isEmailConfirmed: true,
  location: "Київ",
  bio: "Тестовий користувач для демонстрації функціоналу",
  skills: ["Волонтерство", "Організація подій"],
  stats: {
    events: 5,
    hours: 25,
    organizations: 2,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const TEST_TOKEN: AccessTokenResponse = {
  accessToken: "test-access-token",
  refreshToken: "test-refresh-token",
  expiresIn: 3600,
};

export const authService = {
  async login(credentials: LoginRequest): Promise<AccessTokenResponse> {
    logger.info("Attempting login", { email: credentials.email });

    // Тестовий вхід
    if (
      credentials.email === "test@example.com" &&
      credentials.password === "test123"
    ) {
      logger.success("Test login successful", { email: credentials.email });
      return TEST_TOKEN;
    }

    const response = await axios.post<AccessTokenResponse>(
      `${API_URL}/login`,
      credentials
    );
    logger.success("Login successful", { email: credentials.email });
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    logger.info("Attempting registration", { email: data.email });
    await axios.post(`${API_URL}/register`, data);
    logger.success("Registration successful", { email: data.email });
  },

  async refreshToken(refreshToken: string): Promise<AccessTokenResponse> {
    logger.info("Refreshing token");

    // Тестовий refresh token
    if (refreshToken === TEST_TOKEN.refreshToken) {
      logger.success("Test token refresh successful");
      return TEST_TOKEN;
    }

    const response = await axios.post<AccessTokenResponse>(
      `${API_URL}/refresh`,
      {
        refreshToken,
      } as RefreshRequest
    );
    logger.success("Token refreshed successfully");
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    logger.info("Requesting password reset", { email });
    await axios.post(`${API_URL}/forgotPassword`, {
      email,
    } as ForgotPasswordRequest);
    logger.success("Password reset email sent", { email });
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    logger.info("Resetting password", { email: data.email });
    await axios.post(`${API_URL}/resetPassword`, data);
    logger.success("Password reset successful", { email: data.email });
  },

  async getUserInfo(): Promise<InfoResponse> {
    logger.info("Fetching user info");

    // Тестовий користувач
    const token = localStorage.getItem("accessToken");
    if (token === TEST_TOKEN.accessToken) {
      logger.success("Test user info fetched successfully");
      return TEST_USER;
    }

    const response = await axios.get<InfoResponse>(`${API_URL}/manage/info`);
    logger.success("User info fetched successfully");
    return response.data;
  },

  async updateUserInfo(data: InfoRequest): Promise<InfoResponse> {
    logger.info("Updating user info");
    const response = await axios.post<InfoResponse>(
      `${API_URL}/manage/info`,
      data
    );
    logger.success("User info updated successfully");
    return response.data;
  },

  async confirmEmail(
    userId: string,
    code: string,
    changedEmail?: string
  ): Promise<void> {
    logger.info("Confirming email", { userId, changedEmail });
    await axios.get(`${API_URL}/confirmEmail`, {
      params: { userId, code, changedEmail },
    });
    logger.success("Email confirmed successfully");
  },

  async resendConfirmationEmail(email: string): Promise<void> {
    logger.info("Resending confirmation email", { email });
    await axios.post(`${API_URL}/resendConfirmationEmail`, { email });
    logger.success("Confirmation email resent successfully");
  },
};
