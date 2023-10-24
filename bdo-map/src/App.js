import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import MyPage from './components/MyPageComponent';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
