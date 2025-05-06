export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  events?: UserEvent[];
  organizations?: UserOrganization[];
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
