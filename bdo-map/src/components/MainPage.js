import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';
import menuIcon from '../assets/icons/menuIcon.svg';
import hisoImage from '../assets/hiso.png';
import { motion } from 'framer-motion';

const HeaderBar = ({ toggleSidebar }) => {
  const { auth } = useAuth();
  const [shadow, setShadow] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (!hasScrolled) {
          setHasScrolled(true);
          setShadow(true);
          setTimeout(() => setShadow(false), 200);
        }
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const headerVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: '0', transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      style={{
        position: 'fixed', top: '1%', left: '25%', width: '50%', height: '30px',
        background: isTransparent ? 'rgba(51, 51, 51, 0.7)' : '#333', padding: '10px 20px',
        zIndex: 100002, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #444', color: 'white', borderRadius: '10px',
        boxShadow: shadow ? '0px 4px 20px rgba(255, 255, 255, 0.8)' : 'none'
      }}>
      <div>
        <img src={menuIcon} alt="Open Sidebar" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
      </div>
      <div>
        {auth.isAuthenticated ? <span>Login {auth.user.name} OK</span> : null}
      </div>
    </motion.div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  const sidebarStyle = {
    width: isOpen ? '250px' : '0', height: '100%', background: '#333',
    color: 'white', position: 'fixed', transition: '0.3s', overflowX: 'hidden', zIndex: 100000
  };

  const listItemStyle = { cursor: 'pointer', marginBottom: '10px' };
  const buttonStyle = {
    background: '#222', color: 'white', border: '1px solid #444', padding: '5px 10px',
    borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s'
  };

  const buttonFadeInStyle = { ...buttonStyle, opacity: showExtraButtons ? 1 : 0, transition: 'opacity 0.5s', marginBottom: '10px' };

  return (
    <div style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img src={menuIcon} alt="Close Sidebar" onClick={toggleSidebar} style={{ cursor: 'pointer', margin: '10px' }} />
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

const ConsoleWindow = ({ showConsole, toggleConsole }) => {
  const [inputCommand, setInputCommand] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showCredits, setShowCredits] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (showConsole) {
      inputRef.current.focus();
    }
  }, [showConsole]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (inputCommand.trim() === '') return;

    const output = `> ${inputCommand}`;
    let newOutputs = [output];

    if (inputCommand === "history") {
      newOutputs.push("Displaying credits...");
      setShowCredits(true);
      setTimeout(() => setShowCredits(false), 10000); // 10 seconds duration
    }

    setConsoleOutput(prev => [...prev, ...newOutputs]);
    setInputCommand('');
  };

  const consoleContainerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.8)', zIndex: 100003,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    overflow: 'hidden'
  };

  const creditsBaseStyle = {
    fontFamily: "'Open Sans', sans-serif",  // Open Sans 폰트 사용
    fontWeight: 300,  // 라이트한 폰트 스타일
    fontSize: '16px',
    letterSpacing: '1px',
    position: 'absolute',
    top: '87%',  
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'top 3s linear',
    textAlign: 'center',
    color: '#ECECEC',  // 연한 회색
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    visibility: 'hidden'
  };

  const activeCreditsStyle = showCredits ? {
    visibility: 'visible',
    top: '10%'
  } : {};

  const combinedCreditsStyle = { ...creditsBaseStyle, ...activeCreditsStyle };

  return (
    <div style={consoleContainerStyle}>
      <div style={{
        padding: '20px', color: 'white', overflowY: 'auto'
      }}>
        {consoleOutput.map((line, index) => <div key={index}>{line}</div>)}
      </div>
      
      <div style={combinedCreditsStyle}>
        <img src={hisoImage} alt="Hiso Logo" style={{ width: '100%', marginBottom: '10px' }}/>
        <p>Made by M.C.K.</p>
        <p>Special thanks to <strong>아페0</strong></p>
        <p>Engineered using React & Node.js</p>
      </div>

      <form onSubmit={handleCommandSubmit} style={{ padding: '10px' }}>
        <input 
          ref={inputRef}
          type="text" value={inputCommand} onChange={(e) => setInputCommand(e.target.value)} 
          placeholder="Enter command..." 
          style={{ 
            width: '100%', padding: '8px', fontSize: '18px', 
            color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', 
            border: 'none', outline: 'none', boxSizing: 'border-box'
          }}
        />
      </form>
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
            <div style={{ position: 'absolute', top: '10%', left: '30%', background: 'white', border: '1px solid gray', borderRadius: '5px', zIndex: 10000 }}>
              <button onClick={() => setCursorToMarker(markerIcon1, 1)} style={selectedMarkerIndex === 1 ? { border: '2px solid blue', borderRadius: '5px' } : {}}>
                <img src={markerIcon1} alt="Marker 1" width="50" />
              </button>
              <button onClick={() => setCursorToMarker(markerIcon2, 2)} style={selectedMarkerIndex === 2 ? { border: '2px solid blue', borderRadius: '5px' } : {}}>
                <img src={markerIcon2} alt="Marker 2" width="50" />
              </button>
              <button onClick={() => setCursorToMarker(markerIcon3, 3)} style={selectedMarkerIndex === 3 ? { border: '2px solid blue', borderRadius: '5px' } : {}}>
                <img src={markerIcon3} alt="Marker 3" width="50" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={goToLogin}>로그인</button>
      )}
      <MapComponent cursorStyle={document.body.style.cursor} isAuthenticated={auth.isAuthenticated} />
      {showConsole && <ConsoleWindow showConsole={showConsole} toggleConsole={() => setShowConsole(prev => !prev)} />}
    </div>
  );
};

export default MainPage;