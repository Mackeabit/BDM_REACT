import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';  // AuthContext를 사용하기 위해 가져옵니다.

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // AuthContext에서 필요한 값을 가져옵니다.
  const { checkAuthStatus } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      alert('사용자 이름과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8389/api/users/login', {
        username,
        password
      },{
        withCredentials: true
      });

      if (response.data.user) {
        alert('로그인 성공');
        
        // 로그인 성공 후에 인증 상태 체크 함수를 호출합니다.
        checkAuthStatus();
        
        navigate("/");
      } else {
        alert('로그인 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert('로그인 실패');
    }
  };

  // GoogleLogin 버튼의 클릭 이벤트 처리는 이전과 동일합니다.
  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8389/api/users/google/login';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#333' }}>
      <div className="homepage-name">
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
          MCK
        </Link>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px', padding: '20px', borderRadius: '10px', background: '#222' }}>
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white', transition: 'border-color 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#555'}
            onBlur={(e) => e.target.style.borderColor = '#444'}
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white', transition: 'border-color 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#555'}
            onBlur={(e) => e.target.style.borderColor = '#444'}
        />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#444', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s' }} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#444'}>
            로그인
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <button onClick={handleGoogleLogin} style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#DB4437', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s' }}>
              Login with Google
          </button>
        </GoogleOAuthProvider>
        <Link to="/register" style={{ color: '#AAA', textDecoration: 'none', transition: 'color 0.3s' }} 
              onMouseOver={(e) => e.target.style.color = '#CCC'}
              onMouseOut={(e) => e.target.style.color = '#AAA'}>
            회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
