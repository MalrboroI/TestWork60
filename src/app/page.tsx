'use client';

import Link from 'next/link';
import useAuthStore from './_stores/auth.store';
import styles from './page.module.scss';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.hero__title}>Welcome to Abelohost Shop</h1>
        <p className={styles.hero__subtitle}>
          This is a test project for Abelohost company.
        </p>
        <div className={styles.hero__buttons}>
          {!isAuthenticated ? (
            <Link href="/login" className={styles.hero__button}>
              Login to Shop
            </Link>
          ) : (
            <Link href="/products" className={styles.hero__button}>
              Browse Products
            </Link>
          )}
          <Link href="/products" className={`${styles.hero__button} ${styles['hero__button--secondary']}`}>
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}