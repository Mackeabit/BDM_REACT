import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import './MyPageComponent.css';

const MyPageComponent = () => {
  const [expanded, setExpanded] = useState(false);  // 확장 상태를 추적
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // 사이드바 상태를 추적

  useEffect(() => {
    setTimeout(() => {
      setExpanded(true);  // 컴포넌트가 마운트된 후 약간의 지연 후 확장
    }, 100);  // 100ms 후에 확장됩니다. 원하는 지연 시간을 설정할 수 있습니다.
  }, []);

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
