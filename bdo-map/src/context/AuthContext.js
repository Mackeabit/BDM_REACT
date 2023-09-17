import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null
  });

  const setUserInfo = (token, role) => {
    setAuth({
      token,
      role
    });
  };

  const logout = () => {
    setAuth({
      token: null,
      role: null
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
