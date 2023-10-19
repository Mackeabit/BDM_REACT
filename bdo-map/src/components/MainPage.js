import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';
import menuIcon from '../assets/icons/menuIcon.svg';
import { motion } from 'framer-motion';

const HeaderBar = ({ toggleSidebar }) => {
  const { auth } = useAuth();
  
  const [shadow, setShadow] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);  // 스크롤이 처음으로 움직였는지 여부를 추적하는 상태
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (!hasScrolled) {
          setHasScrolled(true);
          setShadow(true);
          setTimeout(() => setShadow(false), 200);
        }
        setIsTransparent(true);  // 스크롤이 움직이면 투명도를 활성화
      } else {
        setIsTransparent(false);  // 스크롤이 최상단에 있으면 투명도를 비활성화
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: '-100%'
    },
    visible: {
      opacity: 1,
      y: '0',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      style={{
        position: 'fixed',
        top: '1%', // 중앙에 위치하기 위해 조정
        left: '25%', // 중앙에 위치하기 위해 조정
        width: '50%', // 너비를 50%로 줄임
        height: '30px', // 높이를 늘림
        background: isTransparent ? 'rgba(51, 51, 51, 0.7)' : '#333',
        padding: '10px 20px',
        zIndex: 100002,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #444',
        color: 'white',
        borderRadius: '10px', // 모서리를 둥글게 함
        boxShadow: shadow ? '0px 4px 20px rgba(255, 255, 255, 0.8)' : 'none'  // 조건에 따라 그림자 효과를 적용
      }}
    >
      <div>
        <img 
          src={menuIcon} 
          alt="Open Sidebar" 
          onClick={toggleSidebar} 
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div>
        {auth.isAuthenticated ? (
          <span>Login {auth.user.name} OK</span>
        ) : null}
      </div>
    </motion.div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  const sidebarStyle = {
    width: isOpen ? '250px' : '0',
    height: '100%',
    background: '#333',
    color: 'white',
    position: 'fixed',
    transition: '0.3s',
    overflowX: 'hidden',
    zIndex: 100000
  };

  const listItemStyle = {
    cursor: 'pointer',
    marginBottom: '10px'
  };

  const buttonStyle = {
    background: '#222',
    color: 'white',
    border: '1px solid #444',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  };

  const buttonFadeInStyle = {
    ...buttonStyle,
    opacity: showExtraButtons ? 1 : 0,
    transition: 'opacity 0.5s',
    marginBottom: '10px'
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img 
          src={menuIcon} 
          alt="Close Sidebar" 
          onClick={toggleSidebar} 
          style={{ cursor: 'pointer', margin: '10px' }}
        />
      </div>
      <h2>Sidebar</h2>
      <ul>
        <li style={listItemStyle}>Home</li>
        <li style={listItemStyle} onClick={() => setShowExtraButtons(!showExtraButtons)}>About</li>
        <li style={listItemStyle}>Contact</li>
      </ul>
      <div style={{ position: 'absolute', bottom: '10px', width: '90%', left: '5%' }}>
        {showExtraButtons && (
          <>
            <button style={buttonFadeInStyle}>Button 1</button>
            <button style={buttonFadeInStyle}>Button 2</button>
            <button style={buttonFadeInStyle}>Button 3</button>
          </>
        )}
      </div>
    </div>
  );
};

const MainPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [showMarkersDropdown, setShowMarkersDropdown] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        setShowConsole(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedStyle = {
    border: '2px solid blue',
    borderRadius: '5px'
  };

  const handleLogout = () => {
    logout();
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const toggleMarkersDropdown = () => {
    setShowMarkersDropdown(!showMarkersDropdown);
  };

  const setCursorToMarker = (marker, index) => {
    document.body.style.cursor = `url(${marker}) 25 25, auto`;
    setSelectedMarkerIndex(index);
    setShowMarkersDropdown(false);
  };

  return (
    <div>
      <HeaderBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <h1 style={{textAlign:'center'}}>검은사막 지도</h1>
      {auth.isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={toggleMarkersDropdown}>마킹하기</button>
          {showMarkersDropdown && (
            <div style={{ 
              position: 'absolute', 
              top: '10%',
              left: '30%',
              background: 'white', 
              border: '1px solid gray', 
              borderRadius: '5px', 
              zIndex: 10000 
              }}>
              <button 
                onClick={() => setCursorToMarker(markerIcon1, 1)}
                style={selectedMarkerIndex === 1 ? selectedStyle : {}}
              >
                <img src={markerIcon1} alt="Marker 1" width="50" />
              </button>
              <button 
                onClick={() => setCursorToMarker(markerIcon2, 2)}
                style={selectedMarkerIndex === 2 ? selectedStyle : {}}
              >
                <img src={markerIcon2} alt="Marker 2" width="50" />
              </button>
              <button 
                onClick={() => setCursorToMarker(markerIcon3, 3)}
                style={selectedMarkerIndex === 3 ? selectedStyle : {}}
              >
                <img src={markerIcon3} alt="Marker 3" width="50" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={goToLogin}>로그인</button>
      )}
      <MapComponent cursorStyle={document.body.style.cursor} isAuthenticated={auth.isAuthenticated} />
            {/* 콘솔창 및 뿌옇게 표시하는 배경 */}
            {showConsole && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 100003,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            width: '80%',
            height: '80%',
            backgroundColor: '#333',
            color: 'white',
            padding: '20px',
            overflowY: 'scroll',
          }}>
            Console Content
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
