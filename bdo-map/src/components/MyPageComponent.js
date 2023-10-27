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
  }, [auth, navigate, isAuthReady]);

  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`card ${expanded ? 'expanded' : ''}`}>
        <h2 className="title">
          My Page
        </h2>
        <p>Welcome to your personal page!</p>
        <ProjectComponent
          key="1"
          animationDelay="1.3s"
          title="Healthy" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
        <ProjectComponent 
          key="2"
          animationDelay="1.6s"
          title="Markers" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
        <ProjectComponent 
          animationDelay="1.9s"
          title="User" 
          description="Project about new app of company" 
          role="Manager" 
          time="1 week" 
          progress={60} 
        />
      </div>
    </div>
  );  

};

export default MyPageComponent;
