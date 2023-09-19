import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

const MainPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>검은사막 지도</h1>
      
      {/* 로그인 상태에 따른 UI 표시 */}
      {auth.isAuthenticated ? (
        <div>
          <span style={{ color: 'green' }}>
            Login {auth.user.role} OK
          </span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={goToLogin}>로그인</button>
      )}

      <MapComponent />
    </div>
  );
};

export default MainPage;
