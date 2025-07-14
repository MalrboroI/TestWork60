'use client';

import { Product } from '../../_globalTypes/products.types';
import styles from './ProductCard.module.scss';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean;
}

const ProductCard = ({ product, isAuthenticated }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.productCard__image}
        />
      </div>
      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__title}>{product.title}</h3>
        <p className={styles.productCard__category}>{product.category}</p>
        <p className={styles.productCard__price}>${product.price}</p>
        {isAuthenticated && (
          <button
            className={`${styles.productCard__button} ${
              isFavorite ? styles['productCard__button--active'] : ''
            }`}
            onClick={handleAddToCart}
          >
            {isFavorite ? (
              <span className={styles.productCard__heart}>❤️</span>
            ) : (
              'Add to cart'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;