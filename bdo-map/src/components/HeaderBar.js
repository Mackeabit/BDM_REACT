// HeaderBar.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import menuIcon from '../assets/icons/menuIcon.svg';
import myPageIcon from '../assets/icons/myPageIcon.svg';

const HeaderBar = ({ toggleSidebar, logout, navigate, isAuthenticated }) => {
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
    
    const goToMyPage = () => {
      navigate('/mypage');
    };
  
    const handleLogout = () => {
      logout();
    };
  
    const goToLogin = () => {
      navigate('/login');
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
        <div onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          <img src={menuIcon} alt="Open Sidebar" />
        </div>
        <div>
          {auth.isAuthenticated ? (
            <>
              <span onClick={goToMyPage} style={{ cursor: 'pointer'}}>{auth.user.name}</span>
              <img src={myPageIcon} alt="My Page" onClick={goToMyPage} style={{ cursor: 'pointer', marginLeft: '10px' }} />
              <span onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>로그아웃</span>
            </>
          ) : (
            <span onClick={goToLogin} style={{ cursor: 'pointer' }}>로그인</span>
          )}
        </div>
      </motion.div>
    );
};

export default HeaderBar;
