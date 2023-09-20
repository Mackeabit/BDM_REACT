import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from 'react-google-login';  // Google 로그인 컴포넌트를 위한 import

const LoginComponent = () => {
  const { setUserInfo } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('사용자 이름과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8389/api/users/login', {
        username,
        password
      });

      if (response.data.token) {
        const role = response.data.role || 'user';
        setUserInfo(response.data.token, role);
        alert('로그인 성공');
      } else {
        alert('로그인 실패: ' + response.data.message);
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      alert('로그인 실패');
    }
  };

  const responseGoogle = (response) => {
    // TODO: Google token을 서버에 전송하여 검증 및 사용자 로그인 처리
    console.log(response);
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
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}  // 실제 Google Client ID로 교체 필요
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default LoginComponent;