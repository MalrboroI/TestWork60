'use client';

import styles from './Footer.module.scss';
import useAuthStore from '../../_stores/auth.store';

const Footer = () => {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          © {currentYear}
          {isAuthenticated && ` | Logged as ${user?.email}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;