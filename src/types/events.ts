export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizationId: string;
  status: "active" | "completed" | "cancelled";
  maxVolunteers: number;
  currentVolunteers: number;
  skillsRequired: string[];
  imageUrl?: string;
}

export interface EventFilters {
  status?: "active" | "completed" | "cancelled";
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  skills?: string[];
}
