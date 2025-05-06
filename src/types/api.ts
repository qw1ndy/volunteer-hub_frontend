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

// Подія
export interface Event {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  date: string;
  time: string;
  location: string;
  organizationId: string;
  organization: Organization;
  imageUrl: string;
  requirements: string[];
  contactPerson: string;
  contactEmail: string;
  maxParticipants: number;
  currentParticipants: number;
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Організація
export interface Organization {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  contactEmail: string;
  location: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
}

// Коментар
export interface Comment {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  text: string;
  createdAt: string;
  updatedAt: string;
}

// Відповідь API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Пагінація
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Фільтри для подій
export interface EventFilters {
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  organizationId?: string;
  status?: "active" | "completed" | "cancelled";
  search?: string;
}

// Фільтри для організацій
export interface OrganizationFilters {
  location?: string;
  search?: string;
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
