import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SessionData {
  token: string;
  userId: string;
  expiresAt: number;
}

export class SessionService {
  private static readonly SESSION_KEY = 'user_session';

  static async storeSession(sessionData: SessionData): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error storing session:', error);
      throw error;
    }
  }

  static async getSession(): Promise<SessionData | null> {
    try {
      const sessionString = await AsyncStorage.getItem(this.SESSION_KEY);
      if (!sessionString) return null;
      
      const session = JSON.parse(sessionString) as SessionData;
      
      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        await this.clearSession();
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return null;
    }
  }

  static async clearSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session:', error);
      throw error;
    }
  }

  static async isSessionValid(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null;
  }
}
