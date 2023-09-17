import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // <-- 추가된 부분

const LoginComponent = () => {
  const { setUserInfo } = useAuth();  // <-- 추가된 부분
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8389/api/users/login', {
        username,
        password
      });

      if (response.data.token) {
        // TODO: 실제 서버 응답에서 role을 제공한다면 해당 값을 사용해야 합니다.
        const role = response.data.role || 'user';  // <-- 추가된 부분
        setUserInfo(response.data.token, role);     // <-- 추가된 부분
        alert('로그인 성공');
      } else {
        alert('로그인 실패');
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      alert('로그인 실패');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginComponent;
