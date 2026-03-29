import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const [addedToCart, setAddedToCart] = useState(false);

  // Check if product is in wishlist
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Generate SEO-friendly image name from product title
  const seoImageName = product.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const ratingWidth = ((product.rating?.rate || 0) / 5) * 100;

  return (
    <article className={`${styles['product-card']} animate-fade-in`} aria-label={product.title}>
      {/* Product image */}
      <div className={styles['product-card__image-wrap']}>
        <a href={`/product/${product.id}`} aria-label={`View ${product.title}`}>
          <img
            src={product.image}
            alt={`${product.title} - product image`}
            className={styles['product-card__image']}
            loading="lazy"
            title={seoImageName}
          />
        </a>

        {/* Wishlist button */}
        <button
          className={`${styles['product-card__wishlist']} ${isWishlisted ? styles['product-card__wishlist--active'] : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={isWishlisted}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#e53935' : 'none'} stroke={isWishlisted ? '#e53935' : 'currentColor'} strokeWidth="1.5" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Category badge */}
        <span className={styles['product-card__badge']} aria-label={`Category: ${product.category}`}>
          {product.category}
        </span>

        {/* Quick add overlay */}
        <div className={styles['product-card__overlay']} aria-hidden="true">
          <button
            className={`${styles['product-card__quick-add']} ${addedToCart ? styles['product-card__quick-add--added'] : ''}`}
            onClick={handleAddToCart}
            tabIndex={-1}
          >
            {addedToCart ? '✓ Added' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className={styles['product-card__info']}>
        {/* Rating */}
        {product.rating && (
          <div className={styles['product-card__rating']} aria-label={`Rating: ${product.rating.rate} out of 5, ${product.rating.count} reviews`}>
            <div className={styles['product-card__stars']} aria-hidden="true">
              <div className={styles['product-card__stars-empty']}>★★★★★</div>
              <div className={styles['product-card__stars-filled']} style={{ width: `${ratingWidth}%` }}>★★★★★</div>
            </div>
            <span className={styles['product-card__rating-count']}>({product.rating.count})</span>
          </div>
        )}

        {/* Title */}
        <h2 className={styles['product-card__title']}>
          <a href={`/product/${product.id}`}>{product.title}</a>
        </h2>

        {/* Price row */}
        <div className={styles['product-card__price-row']}>
          <span className={styles['product-card__price']}>${product.price.toFixed(2)}</span>
          <span className={styles['product-card__price-compare']}>${(product.price * 1.3).toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
