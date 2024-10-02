import React from 'react';
import '../styles/ClubCard.css';

interface ClubCardProps {
  title: string;
  price: string;
  features: string[];
  onPurchase: () => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ title, price, features, onPurchase }) => {
  return (
    <div className="club-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-price">{price}</p>
      <ul className="card-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="purchase-button" onClick={onPurchase}>
        Приобрести
      </button>
    </div>
  );
};

export default ClubCard