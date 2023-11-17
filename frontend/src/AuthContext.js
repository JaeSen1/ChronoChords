import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  
  const login = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setAuthUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);