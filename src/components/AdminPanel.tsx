import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { User, CardRequest } from '../types/types';
import { AxiosError } from 'axios';
import '../styles/AdminPanel.css'
interface ErrorResponse {
  message?: string; 
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cards, setCards] = useState<CardRequest[]>([]);
  const [message, setMessage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get('/user/all');
        setUsers(usersResponse.data);

        const cardsResponse = await api.get('/card-type/all');
        setCards(cardsResponse.data);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setMessage(axiosError.response?.data?.message || 'Failed to load data.');
      }
    };

    fetchData();
  }, []);

  const handlePrivilegeChange = async (userId: string, privilege: User['privilege']) => {
    try {
      await api.patch(`/card-type/${userId}/`, { privilege });
      setMessage(`User privilege updated to ${privilege}`);
      setUsers(users.map(user => user.id === userId ? { ...user, privilege } : user));
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setMessage(axiosError.response?.data?.message || 'Failed to update user privilege.');
    }
  };

  const handleCardStatusChange = async (cardId: string, status: CardRequest['status']) => {
    try {
      await api.patch(`/plastic-cards/status`, { status });
      setMessage(`Card status updated to ${status}`);
      setCards(cards.map(card => card.id === cardId ? { ...card, status } : card));
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setMessage(axiosError.response?.data?.message || 'Failed to update card status.');
    }
  };

  return (
    <div className='admin-panel'>
      <h2>Панель администратора</h2>
      {message && <p>{message}</p>} 

      <h3>Manage Users</h3>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name} - {user.email}</p>
          <select
            value={user.privilege}
            onChange={(e) => handlePrivilegeChange(user.id, e.target.value as User['privilege'])}
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      ))}

      <h3>Manage Cards</h3>
      {cards.map(card => (
        <div key={card.id}>
          <p>{card.type} - Status: {card.status}</p>
          <select
            value={card.status}
            onChange={(e) => handleCardStatusChange(card.id, e.target.value as CardRequest['status'])}
          >
            <option value="pending">Pending</option>
            <option value="ready">Ready</option>
            <option value="blocked">Blocked</option>
            <option value="approved">Approved</option> {/* Новый статус */}
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;