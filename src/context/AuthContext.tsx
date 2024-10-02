import React, { createContext, useState, ReactNode } from 'react';
import { api } from '../utils/api';
import { User } from '../types/types';

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<{ accessToken: string, refreshToken: string }>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    secondName: string,
    birthday: string,
    phoneNumber: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> => {
    try {
      const response = await api.post('/auth/signin', { email, password });
      
      const { accessToken, refreshToken } = response.data; // Извлечение токенов из ответа
  
      // Сохранение пользователя 
      setUser(response.data.user);
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    secondName: string,
    birthday: string,
    phoneNumber: string
  ) => {
    if (password !== confirmPassword) {
      console.error('Пароли не совпадают');
      throw new Error('Пароли не совпадают');
    }
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        secondName,
        birthday,
        phoneNumber,
      });

      const { accessToken, refreshToken } = response.data; // снова извлекаем токены 
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setUser(response.data.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
