export const API_CONFIG = {
  BASE_URL: 'https://radius.ci/',
  TIMEOUT: 10000,
} as const;

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6D6D80',
} as const;

export const STORAGE_KEYS = {
  SESSION: 'user_session',
  PREFERENCES: 'user_preferences',
} as const;
