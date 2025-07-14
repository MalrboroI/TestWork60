import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '../_stores/auth.store';

export const useAuth = () => {
  const { isAuthenticated, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const redirectIfAuthenticated = () => {
    if (isAuthenticated) {
      router.push('/products');
    }
  };

  const redirectIfNotAuthenticated = () => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
  };
};