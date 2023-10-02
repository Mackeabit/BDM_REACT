import React, { useState } from 'react'; // useState 추가
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal'; // Modal 추가

Modal.setAppElement('#root'); // For accessibility reasons

const MainPage = () => {
  console.log("MainPage component mounted");

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 추가

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
      >
        <h2>마킹하기</h2>
        {/* 여기에 마킹 관련 폼이나 다른 컴포넌트를 배치하세요. */}
        <button onClick={closeModal}>닫기</button> {/* 모달 닫기 버튼 */}
      </Modal>

      <MapComponent />
    </div>
  );
};

export default MainPage;
