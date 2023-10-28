import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import ProjectComponent from './ProjectComponent';
import './MyPageComponent.css';

const MyPageComponent = () => {
  const { auth, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!isAuthReady) return;
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    setTimeout(() => {
      setExpanded(true);
    }, 100);
  }, [auth, navigate, isAuthReady]);

  const handleProjectClick = (key) => {
    setSelectedProject(key);
  };

  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`card ${expanded ? 'expanded' : ''} ${selectedProject ? 'shift-left' : ''}`}>
        <h2 className="title">My Page</h2>
        <p>Welcome to your personal page!</p>
        <div className="project-list">
          <ProjectComponent
            key="1"
            animationDelay="1.3s"
            title="Healthy"
            description="Project about new app of company"
            role="Manager"
            time="1 week"
            progress={60}
            onClick={() => handleProjectClick('1')}
            isSelected={selectedProject === '1'}
          />
          <ProjectComponent
            key="2"
            animationDelay="1.6s"
            title="Markers"
            description="Project about new app of company"
            role="User"
            time="1 week"
            progress={60}
            onClick={() => handleProjectClick('1')}
            isSelected={selectedProject === '1'}
          />
          <ProjectComponent
            key="3"
            animationDelay="1.9s"
            title="Info"
            description="Project about new app of company"
            role="Guest"
            time="1 week"
            progress={60}
            onClick={() => handleProjectClick('1')}
            isSelected={selectedProject === '1'}
          />
          <ProjectComponent
            key="4"
            animationDelay="2.1s"
            title="Data"
            description="Project about new app of company"
            role="Guest"
            time="1 week"
            progress={60}
            onClick={() => handleProjectClick('1')}
            isSelected={selectedProject === '1'}
          />

          {/* 다른 ProjectComponent들도 추가... */}
        </div>
        {selectedProject && (
          <div className="selected-project">
            {/* 선택된 프로젝트를 중앙에 표시 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageComponent;
