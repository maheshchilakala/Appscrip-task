import React from 'react';
import { useShop } from '../context/ShopContext';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useShop();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && <div className={styles['cart-backdrop']} onClick={() => setIsCartOpen(false)} />}
      
      {/* Drawer */}
      <div className={`${styles['cart-drawer']} ${isCartOpen ? styles['cart-drawer--open'] : ''}`}>
        <div className={styles['cart-drawer__header']}>
          <h2>Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart">✕</button>
        </div>

        <div className={styles['cart-drawer__content']}>
          {cart.length === 0 ? (
            <p className={styles['cart-drawer__empty']}>Your bag is empty.</p>
          ) : (
            <ul className={styles['cart-drawer__items']}>
              {cart.map((item) => (
                <li key={item.id} className={styles['cart-item']}>
                  <img src={item.image} alt={item.title} className={styles['cart-item__image']} />
                  <div className={styles['cart-item__details']}>
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className={styles['cart-item__actions']}>
                      <div className={styles['cart-item__quantity']}>
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <button className={styles['cart-item__remove']} onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles['cart-drawer__footer']}>
            <div className={styles['cart-drawer__subtotal']}>
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className={styles['cart-drawer__subtotal']} style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              <span>Estimated Tax (10%)</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className={styles['cart-drawer__subtotal']} style={{ fontWeight: 600, fontSize: '1.4rem', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px' }}>
              <span>Total Bill</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
            <button className={styles['cart-drawer__checkout']}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
