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
  const [moveOutOfContainer, setMoveOutOfContainer] = useState(false);  // New state
  const [pageTitle, setPageTitle] = useState("My Page");

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

  const handleProjectClick = (key, title) => {
    setSelectedProject(key);
    setPageTitle(title);
    setMoveOutOfContainer(true);
  };

  const projectComponents = (
    <>
      <ProjectComponent
        key="1"
        animationDelay="1.3s"
        title="Healthy"
        description="Project about new app of company"
        role="Manager"
        time="1 week"
        progress={60}
        onClick={() => handleProjectClick('1', 'Healthy')}
        isSelected={selectedProject === '1'}
      />
      <ProjectComponent
        key="2"
        animationDelay="1.6s"
        title="카테고리"
        description="Project about new app of company"
        role="Manager"
        time="1 week"
        progress={60}
        onClick={() => handleProjectClick('2', '카테고리')}
        isSelected={selectedProject === '2'}
      />
      <ProjectComponent
        key="3"
        animationDelay="1.9s"
        title="마커"
        description="Project about new app of company"
        role="Manager"
        time="1 week"
        progress={60}
        onClick={() => handleProjectClick('3', '마커')}
        isSelected={selectedProject === '3'}
      />
      <ProjectComponent
        key="4"
        animationDelay="2.1s"
        title="계정 정보"
        description="Project about new app of company"
        role="Manager"
        time="1 week"
        progress={60}
        onClick={() => handleProjectClick('4', '계정 정보')}
        isSelected={selectedProject === '4'}
      />


      {/* ... other ProjectComponents */}
    </>
  );

  return (
    <>
      <div className={`container ${moveOutOfContainer ? 'reduced-width' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`card ${expanded ? 'expanded' : ''} ${selectedProject ? 'shift-left' : ''}`}>
          <h2 className="title">{pageTitle}</h2>
          <p>Welcome to your personal page!</p>
          <div className="project-list">
            { !moveOutOfContainer && projectComponents }
          </div>
          {selectedProject && (
            <div className="selected-project">
              {/* Selected project details go here */}
            </div>
          )}
        </div>
      </div>
      { moveOutOfContainer ? (
        <div className="project-outside-container entering-to">
          { projectComponents }
        </div>
      ) : (
        <div className="project-outside-container leaving-to">
          { projectComponents }
        </div>
      )}
    </>
  );
};

export default MyPageComponent;
