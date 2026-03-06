import api from './api';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const register = async (payload: any) => {
  const res = await api.post('/auth/register', payload);
  return res.data;
};

export const logout = async (refreshToken: string | null) => {
  const res = await api.post('/auth/logout', { refreshToken });
  return res.data;
};
