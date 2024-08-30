import React, { useState } from 'react';
import { api } from '../utils/api';
import '../styles/CardRequest.css'

const CardRequestForm: React.FC = () => {
  const [type, setType] = useState<string>('standard');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/plastic-card/new`, { type });
      setMessage('Card request submitted successfully.');
    } catch (error) {
      console.error('Failed to submit card request:', error); // Используем error для логирования в консоль
      setMessage('Failed to submit card request.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Тип карты:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="standard">Стандартная</option>
          <option value="premium">Премиум</option>
          <option value="vip">VIP</option>
        </select>
      </label>
      <button type="submit">Отправить</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CardRequestForm;
