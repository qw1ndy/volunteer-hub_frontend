// Користувач
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  stats: {
    events: number;
    hours: number;
    organizations: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Відповідь API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Авторизація
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
