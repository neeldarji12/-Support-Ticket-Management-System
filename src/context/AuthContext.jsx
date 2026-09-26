import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('logged_in_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('logged_in_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('logged_in_user');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await api.login(email, password);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async (role) => {
    const users = await api.getUsers();
    const demoUser = users.find((u) => u.role === role);
    if (demoUser) {
      setCurrentUser(demoUser);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        loginAsDemo,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
