'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import useAuthStore from '../../_stores/auth.store';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__topBar}>
        <div className={styles.header__topContainer}>
          <div className={styles.header__contacts}>
            <a href="tel:+021-95-51-84">
              <FiPhone />
              <span>+021-95-51-84</span>
            </a>
            <a href="mailto:shop@abelohost.com">
              <FiMail />
              <span>shop@abelohost.com</span>
            </a>
            <div>
              <FiMapPin />
              <span>1734 Stonecoal Road</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__logo}>
          Abelohost Shop
        </Link>
        <nav className={styles.header__nav}>
          {isAuthenticated ? (
            <div className={styles.header__user}>
              <span className={styles.header__name}>
                {user?.firstName} {user?.lastName}
              </span>
              <button onClick={handleLogout} className={styles.header__logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.header__login}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;