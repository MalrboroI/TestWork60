'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../_stores/auth.store';
import Spinner from '../Spinner';
import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, initialize } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Имитация загрузки
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, initialize, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
        <p className={styles.loadingText}>Checking authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;