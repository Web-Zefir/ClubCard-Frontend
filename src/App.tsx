import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';
import CardRequestForm from './components/CardRequestForm';
import MainPage from './components/MainPage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import Logout from './components/Logout';
import './styles/App.css'


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/card-request" element={<CardRequestForm />} />
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
