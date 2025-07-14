'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../_services/auth.service';
import useAuthStore from '../../_stores/auth.store';
// import { useAuth } from '../../_hooks/useAuth';
import Spinner from '../../_components/Spinner';
import styles from './page.module.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login: storeLogin } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.username.length < 3 || formData.password.length < 3) {
      setError('Имя пользователя и пароль должны быть не менее 3 символов');
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData);
      storeLogin(response, response.token);
      router.push('/products');
    } catch (err) {
      setError('Невалидные значения, пожалуйста, введите заново.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Login</h1>
        {error && <p className={styles.login__error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.login__form}>
          <div className={styles.login__formGroup}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={styles.login__input}
              required
              minLength={3}
            />
          </div>
          <div className={styles.login__formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.login__input}
              required
              minLength={3}
            />
          </div>
          <button
            type="submit"
            className={styles.login__button}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}