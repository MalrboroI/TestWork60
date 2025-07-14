'use client';

import { useEffect } from 'react';
import useAuthStore from './_stores/auth.store';

interface StoreInitializerProps {
  session: {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
  };
}

const StoreInitializer = ({ session }: StoreInitializerProps) => {
  useEffect(() => {
    useAuthStore.setState({
      user: session.user,
      token: session.token,
      isAuthenticated: session.isAuthenticated,
    });
  }, [session]);

  return null;
};

export default StoreInitializer;