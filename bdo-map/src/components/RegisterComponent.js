import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('http://localhost:8389/api/users/register', {
        username,
        password
      });
      
      alert('회원가입 성공');
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert('회원가입 실패');
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
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
};

export default RegisterComponent;
