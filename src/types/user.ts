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

export interface UserEvent {
  id: string;
  title: string;
  date: string;
  status: "active" | "completed" | "cancelled";
  role: "volunteer" | "organizer";
}

export interface UserOrganization {
  id: string;
  name: string;
  role: "member" | "admin";
}

export interface UserStats {
  events: number;
  hours: number;
  organizations: number;
}
