import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      token: null,
      role: null,
      name: null
    }
  });

  const [isAuthReady, setIsAuthReady] = useState(false); // 추가

  // 인증 상태 체크 함수 분리
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/status', {
        headers: {
          'Authorization': `${Cookies.get('auth_token')}`
        }
      });

      if (response.data.isAuthenticated) {
        setAuth({
          isAuthenticated: true,
          user: {
            token: Cookies.get('auth_token'),
            role: response.data.role,
            name: response.data.username
          }
        });
      } else {
        setAuth({
          isAuthenticated: false,
          user: {
            token: null,
            role: null,
            name: null
          }
        });
      }
    } catch (error) {
      console.error('Authentication status check failed', error);
      setAuth({
        isAuthenticated: false,
        user: {
          token: null,
          role: null,
          name: null
        }
      });
    }
    setIsAuthReady(true); // 비동기 작업 완료 후 isAuthReady를 true로 설정
  };

  useEffect(() => {
    checkAuthStatus();  // 컴포넌트 마운트 시 인증 상태 체크
  }, []);

  const logout = () => {
    Cookies.remove('auth_token');
    setAuth({
      isAuthenticated: false,
      user: {
        token: null,
        role: null,
        name: null
      }
    });
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthReady, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
