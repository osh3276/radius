import { useState, useEffect } from 'react';
import { SessionService, SessionData } from '../services/sessionService';

export const useSession = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    console.log("Loaded session data")
    try {
      const sessionData = await SessionService.getSession();
      console.log(JSON.stringify(sessionData)); 
      setSession(sessionData);
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, userId: string, expiresIn: number = 86400000) => {
    const sessionData: SessionData = {
      token,
      userId,
      expiresAt: Date.now() + expiresIn // Default 24 hours
    };
    
    await SessionService.storeSession(sessionData);
    setSession(sessionData);
  };

  const logout = async () => {
    await SessionService.clearSession();
    setSession(null);
  };

  const isAuthenticated = session !== null;

  return {
    session,
    isLoading,
    isAuthenticated,
    login,
    logout,
    reload: loadSession
  };
};
