import { Organization } from "../types/organization";

interface OrganizationFilters {
  search: string;
  location: string;
  sortBy: "name" | "rating" | "membersCount";
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const organizationService = {
  async getOrganizations(
    filters: OrganizationFilters
  ): Promise<Organization[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);

      const response = await fetch(
        `${API_BASE_URL}/organizations?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Organization[]> = await response.json();

      if (result.status !== 200) {
        throw new Error(result.message || "Помилка при отриманні даних");
      }

      return result.data;
    } catch (error) {
      console.error("Помилка при отриманні організацій:", error);
      throw error;
    }
  },

  async getOrganizationById(id: string): Promise<Organization> {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Organization> = await response.json();

      if (result.status !== 200) {
        throw new Error(result.message || "Помилка при отриманні даних");
      }

      return result.data;
    } catch (error) {
      console.error("Помилка при отриманні організації:", error);
      throw error;
    }
  },

  async joinOrganization(organizationId: string): Promise<void> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<void> = await response.json();

      if (result.status !== 200) {
        throw new Error(
          result.message || "Помилка при приєднанні до організації"
        );
      }
    } catch (error) {
      console.error("Помилка при приєднанні до організації:", error);
      throw error;
    }
  },
};
