
import { api } from '../utils/api';

export const loginService = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return response.data.user;
};

export const registerService = async (email: string, password: string) => {
  const response = await api.post('/auth/signup', { email, password });
  return response.data.user;
};

export const logoutService = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
