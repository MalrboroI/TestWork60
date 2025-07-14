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
  initialize: () => void;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    const userCookie = encodeURIComponent(JSON.stringify(user));
    document.cookie = `user=${userCookie}; path=/; max-age=86400; samesite=lax`; // сутки
    document.cookie = `token=${token}; path=/; max-age=86400; samesite=lax`; // сутки
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: () => {
    const token = getCookie('token');
    const userCookie = getCookie('user');
    
    if (token && userCookie) {
      try {
        const user = JSON.parse(userCookie);
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
        set({ user: null, token: null, isAuthenticated: false });
      }
    } else {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;