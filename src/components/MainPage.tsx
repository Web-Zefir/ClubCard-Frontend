import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import '../styles/MainPage.css'

const MainPage: React.FC = () => {
  const [qrCodeValue] = useState('https://t1.ru/'); 

  return (
    <div className='main-page'>
      <h2>Главная страница</h2>
      <div>
        <div id="qr-code">
          <QRCode value={qrCodeValue} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;