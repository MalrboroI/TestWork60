'use client';

import { useProducts } from '../../_hooks/useProducts';
import Link from 'next/link';
import ProductCard from '../../_components/ProductCard';
import useAuthStore from '../../_stores/auth.store';
import Spinner from '../../_components/Spinner';
import styles from './products.module.scss';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const { isAuthenticated } = useAuthStore();

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

   if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.products__links}>
            <Link href="/">Home</Link>
            <Link href="/hot-deals">Hot Deals</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/laptops">Laptops</Link>
            <Link href="/smartphones">Smartphones</Link>
            <Link href="/cameras">Cameras</Link>
            <Link href="/accessories">Accessories</Link>
          </div>
      <h1 className={styles.sectionTitle}>Latest Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;