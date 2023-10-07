import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';

const MainPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [showMarkersDropdown, setShowMarkersDropdown] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

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
    setShowMarkersDropdown(false);  // 마커 선택 후 드롭다운 메뉴 닫기
  };

  return (
    <div>
      <h1>검은사막 지도</h1>
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
              top: '10%',  // 버튼 바로 아래에 위치
              left: '30%',    // 버튼의 왼쪽 정렬
              background: 'white', 
              border: '1px solid gray', 
              borderRadius: '5px', 
              zIndex: 10000     // 필요한 경우 다른 요소 위에 나타나게 하기 위해 zIndex 값 추가 
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
      <MapComponent />
    </div>
  );
};

export default MainPage;
