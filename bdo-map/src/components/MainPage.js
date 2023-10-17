import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';
import menuIcon from '../assets/icons/menuIcon.svg';

// Sidebar component
const Sidebar = ({ isOpen }) => {
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

  return (
    <div style={sidebarStyle}>
      <h2>Sidebar</h2>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

const MainPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [showMarkersDropdown, setShowMarkersDropdown] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar state

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

  const menuIconStyle = {
    position: 'absolute',
    top: '10px',
    left: isSidebarOpen ? '210px' : '10px',
    transition: '0.3s',
    cursor: 'pointer',
    zIndex: 100001
  };

  return (
    <div>
      <img 
        src={menuIcon} 
        alt="Menu Icon" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        style={menuIconStyle}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <h1 style={{textAlign:'center'}}>검은사막 지도</h1>
      {auth.isAuthenticated ? (
        <div>
          <span style={{ color: 'green' }}>
            Login {auth.user.name} OK
          </span>
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
    </div>
  );
};

export default MainPage;
