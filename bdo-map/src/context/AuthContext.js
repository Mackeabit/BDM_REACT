import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';  // 서버에 요청을 보내기 위한 라이브러리

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log("auth");
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      token: null,
      role: null,
      name: null
    }
  });

  useEffect(() => {
    // 서버에 인증 상태 확인을 요청
    axios.get('/api/auth/status', {
      headers: {
        'Authorization': `${Cookies.get('auth_token')}`
      }
    })
    .then(response => {
      if (response.data.isAuthenticated) {
        setAuth({
          isAuthenticated: true,
          user: {
            token: Cookies.get('auth_token'),  // 토큰은 여기서만 직접 가져옵니다.
            role: response.data.role,
            name: response.data.username
          }
        });
      } else {
        // 만약 인증되지 않은 상태라면 auth 상태를 초기화합니다.
        setAuth({
          isAuthenticated: false,
          user: {
            token: null,
            role: null,
            name: null
          }
        });
      }
    })
    .catch(error => {
      console.error('Authentication status check failed', error);
      setAuth({
        isAuthenticated: false,
        user: {
          token: null,
          role: null,
          name: null
        }
      });
    });
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
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
