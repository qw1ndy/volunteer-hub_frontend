import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Перевірка токена при завантаженні
    const token = localStorage.getItem("token");
    if (token) {
      // Тут буде запит до API для отримання даних користувача
      // Поки що використовуємо мокові дані
      setUser({
        id: "1",
        name: "Іван Петренко",
        email: "user@example.com",
        location: "Київ, Україна",
        bio: "Активний волонтер з 5-річним досвідом",
        avatar: "/photo_2024-04-18_02-14-36.jpg",
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Тут буде реальний запит до API
      // Поки що імітуємо успішний вхід
      const token = "mock-token";
      localStorage.setItem("token", token);

      setUser({
        id: "1",
        name: "Іван Петренко",
        email: email,
        location: "Київ, Україна",
        bio: "Активний волонтер з 5-річним досвідом",
        avatar: "/photo_2024-04-18_02-14-36.jpg",
      });
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error("Помилка при вході:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Тут буде реальний запит до API
      // Поки що імітуємо успішну реєстрацію
      const token = "mock-token";
      localStorage.setItem("token", token);

      setUser({
        id: "1",
        name: name,
        email: email,
        location: "Київ, Україна",
        bio: "Новий волонтер",
        avatar: "/default-avatar.jpg",
      });
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error("Помилка при реєстрації:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
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
