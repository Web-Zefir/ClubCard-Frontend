import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/useAuth'; 
import '../styles/Header.css';
import LogoT1 from '../assets/T1 1.svg';
import LogoutModal from './LogoutModal';
import { useAuth } from '../context/useAuth';

const Header: React.FC = () => {
  const { logout } = useAuth();
  //   const { user, logout } = useAuth(); 

  const navigate = useNavigate();  
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    await logout(); // Ждем завершения выхода
    setShowModal(false); 
    navigate('/');
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  return (
    <header className='header'>
      <nav className='Header-nav'>
        <div>
        <img src={LogoT1} alt="T1 logo" />
        </div>
        <div className='Header-links'>
        <Link className='nav-links' to="/">Главная</Link>
        <Link className='nav-links' to="/register">Регистрация</Link>
        <Link className='nav-links' to="/login">Вход</Link>
        <Link className='nav-links' to="/profile">Пользователь</Link>
        <Link className='nav-links' to="/admin">Администратор</Link>
        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className='nav-links'>
          Выйти
        </a> 
        </div>
      </nav>
      {showModal && <LogoutModal onConfirm={handleConfirm} onCancel={handleCancel} />}
    </header>
  );
};

export default Header;

// const Header: React.FC = () => {
//   const { user, logout } = useAuth(); 
//   return (
//     <header className='header'>
//       <nav className='Header-nav'>
//         <img src={LogoT1} alt="T1 logo" />
//         <Link className='nav-links' to="/">Home</Link>
//         {user ? (
//           <>
//             <Link className='nav-links' to="/profile">Profile</Link>
//             <Link className='nav-links' to="/logout">Logout</Link>
//             <button className='nav-links' onClick={logout}>Logout</button>
//             <Link className='nav-links' to="/admin">Admin</Link>

//           </>
//         ) : (
//           <>
//             <Link className='nav-links' to="/register">Register</Link>
//             <Link className='nav-links' to="/login">Login</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };
