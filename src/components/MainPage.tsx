import React from "react";
import ClubCard from "./ClubCard";
import "../styles/MainPage.css";
// import QRCode from "qrcode.react";

const MainPage: React.FC = () => {
  // const [qrCodeValue] = useState('https://consta.design'); 

  const handlePurchase = () => {
    alert("Карта приобретена! Ожидайте подтверждения администратором.");
  };

  const cards = [
    {
      title: "Стандартная",
      price: "1500",
      features: [
        "Доступ в тренажерный зал",
        "Посещение групповых занятий",
        "Бесплатная вода",
      ],
    },
    {
      title: "Повышенная",
      price: "3000",
      features: [
        "Базовая карта",
        "Доступ в сауну",
        "Личные тренировки 2 раза в месяц",
      ],
    },
    {
      title: "VIP",
      price: "5000",
      features: [
        "Премиум карта",
        "Личные тренировки 4 раза в месяц",
        "Персональный шкафчик",
      ],
    },
  ];
 
  return (
    <div className="main-page">
      <h2>Клубные карты</h2>
      <div className="cards-container">
        {cards.map((card, index) => (
          <ClubCard
            key={index}
            title={card.title}
            price={card.price}
            features={card.features}
            onPurchase={handlePurchase}
          />
        ))}
      </div>
      {/* <div id="qr-code">
        <QRCode value={qrCodeValue} />
      </div> */}
    </div>
  );
};

export default MainPage;