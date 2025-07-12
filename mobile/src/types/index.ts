export interface SessionData {
  token: string;
  userId: string;
  expiresAt: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
