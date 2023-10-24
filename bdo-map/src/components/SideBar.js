import React, { useState } from 'react';
import menuIcon from '../assets/icons/menuIcon.svg';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className={`tab ${!isOpen ? 'show' : ''}`} onClick={toggleSidebar}>
        <img src={menuIcon} alt="Open Sidebar" style={{ width: '20px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img src={menuIcon} alt="Close Sidebar" onClick={toggleSidebar} style={{ cursor: 'pointer', margin: '15px' }} />
      </div>
      <h2>Sidebar</h2>
      <ul>
        <li className="list-item">Home</li>
        <li className="list-item" onClick={() => setShowExtraButtons(!showExtraButtons)}>About</li>
        <li className="list-item">Contact</li>
      </ul>
      <div style={{ position: 'absolute', bottom: '15px', width: '90%', left: '5%' }}>
        {showExtraButtons && (
          <>
            <button className={`button button-fade-in ${showExtraButtons ? 'visible' : ''}`}>Button 1</button>
            <button className={`button button-fade-in ${showExtraButtons ? 'visible' : ''}`}>Button 2</button>
            <button className={`button button-fade-in ${showExtraButtons ? 'visible' : ''}`}>Button 3</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
