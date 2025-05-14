import api from "./axiosConfig";
import { User } from "../types/api";

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
