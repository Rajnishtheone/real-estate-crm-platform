import { create } from 'zustand';
import { User } from '../types/user';

const getLocal = (key: string) => (typeof window !== 'undefined' ? localStorage.getItem(key) || undefined : undefined);
const getUser = () => {
  if (typeof window === 'undefined') return undefined;
  const raw = localStorage.getItem('user');
  return raw ? (JSON.parse(raw) as User) : undefined;
};

type AuthState = {
  user?: User;
  token?: string;
  refreshToken?: string;
  setAuth: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: getUser(),
  token: getLocal('accessToken'),
  refreshToken: getLocal('refreshToken'),
  setAuth: (user, token, refreshToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ user, token, refreshToken });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    set({ user: undefined, token: undefined, refreshToken: undefined });
  },
}));
