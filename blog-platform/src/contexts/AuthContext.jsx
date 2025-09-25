import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client, Account, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the current user session when the provider mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const current = await account.get();
        setUser(current);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  // Register a new user and sign in immediately
  const register = async (email, password, name) => {
    await account.create(ID.unique(), email, password, name);
    // Create a session after successful registration
    await login(email, password);
  };

  // Create an email session
  const login = async (email, password) => {
    await account.createEmailSession(email, password);
    const current = await account.get();
    setUser(current);
  };

  // Destroy the current session
  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const value = {
    user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
