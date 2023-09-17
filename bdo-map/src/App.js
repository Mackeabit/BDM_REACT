import React from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>검은사막 지도</h1>
        <LoginComponent />
        <RegisterComponent />
        <MapComponent />
      </div>
    </AuthProvider>
  );
}

export default App;
