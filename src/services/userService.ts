import { User, UserStats } from "../types/user";

class UserService {
  private baseUrl = "/api/users";

  async getUserProfile(id: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error("Помилка при отриманні профілю користувача");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при отриманні профілю користувача:", error);
      throw error;
    }
  }

  async updateUserProfile(id: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Помилка при оновленні профілю користувача");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при оновленні профілю користувача:", error);
      throw error;
    }
  }

  async getUserStats(id: string): Promise<UserStats> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/stats`);
      if (!response.ok) {
        throw new Error("Помилка при отриманні статистики користувача");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при отриманні статистики користувача:", error);
      throw error;
    }
  }

  async updateUserSkills(id: string, skills: string[]): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/skills`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills }),
      });
      if (!response.ok) {
        throw new Error("Помилка при оновленні навичок користувача");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при оновленні навичок користувача:", error);
      throw error;
    }
  }

  async uploadAvatar(id: string, file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${this.baseUrl}/${id}/avatar`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Помилка при завантаженні аватара");
      }
      const data = await response.json();
      return data.avatarUrl;
    } catch (error) {
      console.error("Помилка при завантаженні аватара:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
