import axios from 'axios';

const api = axios.create({
  baseURL: 'http://188.120.235.62:8080/api',
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('http://188.120.235.62:8080/api/auth/signup', { token: refreshToken });

        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (e) {
        console.error('Failed to refresh token:', e);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
