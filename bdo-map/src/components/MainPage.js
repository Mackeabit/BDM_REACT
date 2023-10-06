import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal';
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';

Modal.setAppElement('#root');

const MainPage = () => {
  console.log("MainPage component mounted");

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);  // 초기값을 null로 설정

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetCursor();
    setSelectedMarkerIndex(null);  // 선택된 마커 인덱스 초기화
  };

  const setCursorToMarker = (marker, index) => {
    document.body.style.cursor = `url(${marker}) 25 25, auto`;
    setSelectedMarkerIndex(index); // 선택된 마커의 인덱스를 상태에 저장
  };

  const resetCursor = () => {
    document.body.style.cursor = "default";
  };

  const customStyles = {
    content: {
      zIndex: 1000, 
    },
    overlay: {
      zIndex: 999,
    }
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
          <button onClick={openModal}>마킹하기</button>
        </div>
      ) : (
        <button onClick={goToLogin}>로그인</button>
      )}

      <Modal 
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Mark Modal"
        style={customStyles}
      >
        <h2>마킹하기</h2>
        <div>
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
        <button onClick={closeModal}>닫기</button>
      </Modal>

      <MapComponent />
    </div>
  );
};

export default MainPage;
