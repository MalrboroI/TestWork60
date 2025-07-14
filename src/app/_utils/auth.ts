import { cookies } from 'next/headers';

interface Session {
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const getServerSession = async (): Promise<Session> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;
    const userCookie = cookieStore.get('user')?.value;

    let user = null;
    if (userCookie) {
      try {
        user = JSON.parse(userCookie);
      } catch (e) {
        console.error('Failed to parse user cookie', e);
      }
    }

    return {
      user,
      token,
      isAuthenticated: !!token,
    };
  } catch (error) {
    console.error('Error getting server session:', error);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};