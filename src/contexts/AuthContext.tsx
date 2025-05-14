import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authService } from "../services/authService";
import { InfoResponse } from "../types/auth";
import { logger } from "../utils/logger";

interface AuthContextType {
  user: InfoResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<InfoResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
    logger.info("User logged out");
  }, []);

  const loadUserInfo = useCallback(async () => {
    try {
      const userInfo = await authService.getUserInfo();
      setUser(userInfo);
      setIsAuthenticated(true);
      logger.info("User info loaded", { userId: userInfo.id });
    } catch (error) {
      logger.error("Failed to load user info", { error });
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      logger.info("Attempting login", { email });
      const response = await authService.login({ email, password });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      await loadUserInfo();
      logger.success("Login successful", { email });
    } catch (error) {
      logger.error("Login failed", { error, email });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      logger.info("Attempting registration", { email });
      await authService.register({ email, password });
      logger.success("Registration successful", { email });
    } catch (error) {
      logger.error("Registration failed", { error, email });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      loadUserInfo();
    } else {
      setLoading(false);
    }
  }, [loadUserInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
