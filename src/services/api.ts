import axios from "axios";
import {
  User,
  Event,
  Organization,
  Comment,
  AuthCredentials,
  RegisterData,
  AuthResponse,
  PaginationParams,
  PaginatedResponse,
  EventFilters,
  OrganizationFilters,
} from "../types/api";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Додавання токена до запитів
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обробка помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Авторизація
export const authService = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};

// Події
export const eventService = {
  getEvents: async (
    params: PaginationParams & EventFilters
  ): Promise<PaginatedResponse<Event>> => {
    const response = await api.get<PaginatedResponse<Event>>("/events", {
      params,
    });
    return response.data;
  },

  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  createEvent: async (event: Omit<Event, "id">): Promise<Event> => {
    const response = await api.post<Event>("/events", event);
    return response.data;
  },

  updateEvent: async (id: string, event: Partial<Event>): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}`, event);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  },

  joinEvent: async (id: string): Promise<void> => {
    await api.post(`/events/${id}/join`);
  },

  leaveEvent: async (id: string): Promise<void> => {
    await api.post(`/events/${id}/leave`);
  },
};

// Організації
export const organizationService = {
  getOrganizations: async (
    params: PaginationParams & OrganizationFilters
  ): Promise<PaginatedResponse<Organization>> => {
    const response = await api.get<PaginatedResponse<Organization>>(
      "/organizations",
      { params }
    );
    return response.data;
  },

  getOrganization: async (id: string): Promise<Organization> => {
    const response = await api.get<Organization>(`/organizations/${id}`);
    return response.data;
  },

  createOrganization: async (
    organization: Omit<Organization, "id">
  ): Promise<Organization> => {
    const response = await api.post<Organization>(
      "/organizations",
      organization
    );
    return response.data;
  },

  updateOrganization: async (
    id: string,
    organization: Partial<Organization>
  ): Promise<Organization> => {
    const response = await api.put<Organization>(
      `/organizations/${id}`,
      organization
    );
    return response.data;
  },
};

// Коментарі
export const commentService = {
  getEventComments: async (eventId: string): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/events/${eventId}/comments`);
    return response.data;
  },

  createComment: async (eventId: string, text: string): Promise<Comment> => {
    const response = await api.post<Comment>(`/events/${eventId}/comments`, {
      text,
    });
    return response.data;
  },

  deleteComment: async (eventId: string, commentId: string): Promise<void> => {
    await api.delete(`/events/${eventId}/comments/${commentId}`);
  },
};

// Користувачі
export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },

  updateUserSkills: async (id: string, skills: string[]): Promise<User> => {
    const response = await api.put<User>(`/users/${id}/skills`, { skills });
    return response.data;
  },
};
