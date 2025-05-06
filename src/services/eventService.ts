import { Event, EventFilters } from "../types/events";

class EventService {
  private baseUrl = "/api/events";

  async getEvents(filters?: EventFilters): Promise<Event[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Помилка при отриманні подій");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при отриманні подій:", error);
      throw error;
    }
  }

  async getEventById(id: string): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error("Помилка при отриманні події");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при отриманні події:", error);
      throw error;
    }
  }

  async createEvent(event: Omit<Event, "id">): Promise<Event> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Помилка при створенні події");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при створенні події:", error);
      throw error;
    }
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Помилка при оновленні події");
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при оновленні події:", error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Помилка при видаленні події");
      }
    } catch (error) {
      console.error("Помилка при видаленні події:", error);
      throw error;
    }
  }

  async joinEvent(eventId: string, userId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${eventId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Помилка при приєднанні до події");
      }
    } catch (error) {
      console.error("Помилка при приєднанні до події:", error);
      throw error;
    }
  }

  async leaveEvent(eventId: string, userId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${eventId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Помилка при виході з події");
      }
    } catch (error) {
      console.error("Помилка при виході з події:", error);
      throw error;
    }
  }
}

export const eventService = new EventService();
