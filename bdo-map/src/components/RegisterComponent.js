import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // React Router v6에서는 useNavigate 사용
import './RegisterComponent.css';  // 스타일시트 불러오기

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  // React Router v6에서는 useNavigate 사용

  const handleRegister = async () => {
    // 유효성 검사
    if (username.length < 4) {
      alert('사용자 이름은 최소 4자 이상이어야 합니다.');
      return;
    }
    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('http://localhost:8389/api/users/signup', {
        username,
        password,
      });
      
      alert('회원가입 성공');
      navigate('/login');  // 회원가입 성공 후 로그인 페이지로 이동
      
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert('회원가입 실패');
    }
  };

  return (
    <div className="register-container">
      <div className="homepage-name">
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
          MCK
        </Link>
      </div>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">회원가입</button>
    </div>
  );
};

export default RegisterComponent;