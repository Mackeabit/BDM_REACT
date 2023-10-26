// MyPageComponent.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import ProjectComponent from './ProjectComponent';  // 추가된 import
import './MyPageComponent.css';

const MyPageComponent = () => {
  const { auth, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthReady) return;  // 인증 상태가 준비되지 않았으면 아무 것도 하지 않음

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
        <ProjectComponent 
          title="Healthy" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
        <ProjectComponent 
          title="Healthy" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
        <ProjectComponent 
          title="Healthy" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
        {/* 여기에 추가적으로 다른 프로젝트 컴포넌트들을 추가할 수 있습니다. */}
      </div>
    </div>
  );
};

export default MyPageComponent;
