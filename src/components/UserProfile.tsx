import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { User } from '../types/types';
import QRCode from 'qrcode.react';
import '../styles/UserProfile.css';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  role: string[];
  user_id: number;
  sub: string; // email
  iat: number;
  lat: number;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState<boolean>(false); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        const decoded: DecodedToken = jwtDecode<DecodedToken>(accessToken);

        const user_id = decoded.user_id;
        if (!user_id) {
          throw new Error('UserId not found in token');
        }  

        const response = await api.get(`/user/${user_id}`);
        const userData = response.data;

        setUser(userData);

        const filteredUserData = {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          secondName: userData.secondName,
          birthday: userData.birthday,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          isBlocked: userData.isBlocked
        };

        const jsonUserData = JSON.stringify(filteredUserData);
        setQrCodeValue(jsonUserData);

      } catch (error) {
        console.error('Failed to load user profile:', error);
        setMessage('Failed to load user profile.');
      }
    };

    fetchUser();
  }, []);

  const handleButtonClick = () => {
    setShowQRCode(!showQRCode); // Переключаем видимость QR-кода
  };

  return (
    <div className='user-profile'>
      <h2>Профиль пользователя</h2>
      {user ? (
        <div className='user-infoinfo'>
          <p>Фамилия: {user.lastName}</p>
          <p>Имя: {user.firstName}</p>
          <p>Отчество: {user.secondName}</p>
          <p>Дата рождения: {user.birthday}</p>
          <p>Номер телефона: {user.phoneNumber}</p>
          <p>Электронная почта: {user.email}</p>
          <h4>Подробная информация</h4>
          
          <button className='qr-code-button' onClick={handleButtonClick}>
            {showQRCode ? "Скрыть QR-код" : "Показать QR-код"}
          </button>

          {showQRCode && (
            <div id="qr-code">
              <QRCode value={qrCodeValue.slice(1, qrCodeValue.length - 1)} />
            </div>
          )}

        </div>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserProfile;