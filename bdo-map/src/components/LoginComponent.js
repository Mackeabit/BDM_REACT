import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
    
    if (!username || !password) {
      alert('사용자 이름과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8389/api/users/login', {
        username,
        password
      },{
        withCredentials: true // 크로스 오리진 요청에 쿠키 포함
      });

      if (response.data.user) {

        alert('로그인 성공');
        navigate("/");
      } else {
        alert('로그인 실패: ' + response.data.message);
      }

    } catch (error) {
      console.error("로그인 실패:", error);
      alert('로그인 실패');
    }
  };



  // GoogleLogin 버튼의 클릭 이벤트 처리
  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8389/api/users/google/login'; // 서버로 로그인 요청
  };


  return (
    <div>
      <form onSubmit={handleLogin}>
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
        />
        <button type="submit">로그인</button>
      </form>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <button onClick={handleGoogleLogin}>
            Login with Google
        </button>
      </GoogleOAuthProvider>

      <Link to="/register">회원가입</Link>
    </div>
  );
};

export default LoginComponent;
