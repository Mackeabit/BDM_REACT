import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,  // <-- 추가된 부분
    user: {
      token: null,
      role: null
    }
  });

  const setUserInfo = (token, role) => {
    setAuth({
      isAuthenticated: true,  // <-- 추가된 부분
      user: {
        token,
        role
      }
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,  // <-- 추가된 부분
      user: {
        token: null,
        role: null
      }
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
