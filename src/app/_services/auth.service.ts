import api from './api';
import { LoginFormData } from '../_globalTypes/auth.types';

export const login = async (credentials: LoginFormData) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};