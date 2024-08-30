import React, { useState } from 'react';
import LogoutModal from './LogoutModal';
import { useAuth } from '../context/useAuth';
import '../styles/LogoutModal.css'; 

const Logout: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setShowModal(true); 
  };

  const handleConfirm = () => {
    logout();
    setShowModal(false); 
  };

  const handleCancel = () => {
    setShowModal(false); 
  };

  return (
    <div>
      <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className='logout-link'>
        Выйти
      </a>
      {showModal && <LogoutModal onConfirm={handleConfirm} onCancel={handleCancel} />}
    </div>
  );
};

export default Logout;
