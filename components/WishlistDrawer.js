import React from 'react';
import { useShop } from '../context/ShopContext';
import styles from './WishlistDrawer.module.css';

const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, moveToBag, toggleWishlist } = useShop();

  return (
    <>
      {/* Backdrop */}
      {isWishlistOpen && <div className={styles['wishlist-backdrop']} onClick={() => setIsWishlistOpen(false)} />}
      
      {/* Drawer */}
      <div className={`${styles['wishlist-drawer']} ${isWishlistOpen ? styles['wishlist-drawer--open'] : ''}`}>
        <div className={styles['wishlist-drawer__header']}>
          <h2>Loved Items</h2>
          <button onClick={() => setIsWishlistOpen(false)} aria-label="Close wishlist">✕</button>
        </div>

        <div className={styles['wishlist-drawer__content']}>
          {wishlist.length === 0 ? (
            <div className={styles['wishlist-drawer__empty']}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p>Your Wishlist is Empty.</p>
              <span className={styles['empty-subtitle']}>Curate your perfect style by clicking the heart on products.</span>
            </div>
          ) : (
            <ul className={styles['wishlist-drawer__items']}>
              {wishlist.map((item) => (
                <li key={item.id} className={styles['wishlist-item']}>
                  <img src={item.image} alt={item.title} className={styles['wishlist-item__image']} />
                  <div className={styles['wishlist-item__details']}>
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className={styles['wishlist-item__actions']}>
                      <button className={styles['btn-move']} onClick={() => moveToBag(item)}>Move to Bag</button>
                      <button className={styles['btn-remove']} onClick={() => toggleWishlist(item)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
