import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import './MyPageComponent.css';

const MyPageComponent = () => {
  const { auth } = useAuth();  // 로그인 상태
  const navigate = useNavigate();  // 리다이렉트를 위한 navigate 함수
  const [expanded, setExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    setTimeout(() => {
      setExpanded(true);
    }, 100);
  }, [auth, navigate]);

  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`card ${expanded ? 'expanded' : ''}`}>
        <h2 className="title">
          My Page
        </h2>
        <p>Welcome to your personal page!</p>
        {/* 이곳에 추가적인 사용자 정보나 기능을 더 넣을 수 있습니다. */}
      </div>
    </div>
  );
};

export default MyPageComponent;
