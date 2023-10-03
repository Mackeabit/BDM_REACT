import React, { useState } from 'react'; // useState 추가
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal'; // Modal 추가
import markerIcon1 from '../assets/icons/npc/npc_icon.png';
import markerIcon2 from '../assets/icons/npc/npc_icon.png';
import markerIcon3 from '../assets/icons/npc/npc_icon.png';


Modal.setAppElement('#root'); // For accessibility reasons

const MainPage = () => {
  console.log("MainPage component mounted");

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 추가
  const [selectedMarker, setSelectedMarker] = useState(markerIcon1);


  const handleLogout = () => {
    logout();
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const openModal = () => {
    setIsModalOpen(true); // Modal 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal 닫기
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
          <button onClick={openModal}>마킹하기</button> {/* 마킹하기 버튼 추가 */}
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
          <button onClick={() => setSelectedMarker(markerIcon1)}>
              <img src={markerIcon1} alt="Marker 1" width="50" />
          </button>
          <button onClick={() => setSelectedMarker(markerIcon2)}>
              <img src={markerIcon2} alt="Marker 2" width="50" />
          </button>
          <button onClick={() => setSelectedMarker(markerIcon3)}>
              <img src={markerIcon3} alt="Marker 3" width="50" />
          </button>
        </div>

        {/* 여기에 마킹 관련 폼이나 다른 컴포넌트를 배치하세요. */}
        <button onClick={closeModal}>닫기</button> {/* 모달 닫기 버튼 */}
      </Modal>

      <MapComponent />
    </div>
  );
};

export default MainPage;
