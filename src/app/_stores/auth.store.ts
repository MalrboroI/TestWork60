import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400`; // сутки
    document.cookie = `token=${token}; path=/; max-age=86400`; // сутки
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;