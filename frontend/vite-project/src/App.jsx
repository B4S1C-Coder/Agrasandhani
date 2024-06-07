import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Login from './Login';
import Quiz from './Quiz';
import StudyPlan from './StudyPlan';
import Setting from './Setting';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Save login state in local storage
  }

  return (
    <Router>
      <div className="grid-container">
        {isLoggedIn && (
          <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          </>
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
            <Route path="/quiz/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Quiz /></ProtectedRoute>} />
            <Route path="/study-plan" element={<ProtectedRoute isLoggedIn={isLoggedIn}><StudyPlan /></ProtectedRoute>} />
            <Route path="/setting" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Setting /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
