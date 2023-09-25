import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie'; // <-- 추가된 부분
import jwt_decode from 'jwt-decode'; // <-- 추가된 부분

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log("auth");
  const [auth, setAuth] = useState({
    isAuthenticated: false,  // <-- 추가된 부분
    user: {
      token: null,
      role: null,
      name: null
    }
  });

  useEffect(() => {
    const token = Cookies.get('auth_token'); // 쿠키에서 토큰 가져오기
    console.log('Token from cookie:', token);
    if (token) {
      try {
        const decodedToken = jwt_decode(token); // 토큰 해독
        console.log(decodedToken);
        setAuth({
          isAuthenticated: true,
          user: {
            token,
            role: decodedToken.role, // 토큰에서 역할 가져오기
            name: decodedToken.username
          }
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const logout = () => {
    Cookies.remove('auth_token');
    setAuth({
      isAuthenticated: false,  // <-- 추가된 부분
      user: {
        token: null,
        role: null,
        name: null
      }
    });
  };

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
