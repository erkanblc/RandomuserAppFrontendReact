import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import UserListDb from './pages/UserListDb';
import UserList from './components/UserList';
import Ikinci from './pages/Ikinci';
import Ucuncu from './pages/Ucuncu';
import YasalUyarilar from './pages/YasalUyarilar';
import { Box } from '@mui/material';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('tokenKey');
  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('tokenKey'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showGoogle, setShowGoogle] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('tokenKey'));
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleRegister = (username, password) => {
    alert(`Kayıt olan kullanıcı: ${username}\nŞifre: ${password}`);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} onShowGoogle={() => setShowGoogle(true)} />
      {showGoogle && (
        <Box sx={{ width: '100%', height: 400, bgcolor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <iframe
            src="https://www.google.com"
            title="Google"
            width="90%"
            height="380"
            style={{ border: 0, borderRadius: 8 }}
          />
          <button style={{ position: 'absolute', right: 32, top: 80, zIndex: 10 }} onClick={() => setShowGoogle(false)}>Kapat</button>
        </Box>
      )}
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login onLogin={handleLogin} username={username} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/home" element={<PrivateRoute><Home username={username} /></PrivateRoute>} />
        <Route path="/birinci" element={<PrivateRoute><UserListDb onLogin={handleLogin} username={username} /></PrivateRoute>} />
        <Route path="/ikinci" element={<PrivateRoute><Ikinci /></PrivateRoute>} />
        <Route path="/ucuncu" element={<PrivateRoute><Ucuncu /></PrivateRoute>} />
        <Route path="/yasal-uyarilar" element={<YasalUyarilar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
