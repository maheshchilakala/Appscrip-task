import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import styles from './AuthModal.module.css';

const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, login } = useShop();
  const [view, setView] = useState('login'); // 'login' or 'signup'

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Member', email: 'user@example.com' });
  };

  const handleGuest = () => {
    login({ name: 'Guest', email: null });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className={styles.close} onClick={() => setIsAuthOpen(false)} aria-label="Close modal">✕</button>
        
        <h2 id="auth-title" className={styles.title}>
          {view === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className={styles.subtitle}>
          {view === 'login' 
            ? 'Access your saved items and faster checkout.' 
            : 'Join MUSE for an exclusive shopping experience.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {view === 'signup' && (
            <input type="text" placeholder="Full Name" required className={styles.input} />
          )}
          <input type="email" placeholder="Email Address" required className={styles.input} />
          <input type="password" placeholder="Password" required className={styles.input} />
          
          <button type="submit" className={styles.submitBtn}>
            {view === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <button className={styles.guestBtn} onClick={handleGuest}>
          Continue as Guest
        </button>

        <p className={styles.switchText}>
          {view === 'login' ? 'New to MUSE?' : 'Already have an account?'}
          <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className={styles.switchBtn}>
            {view === 'login' ? 'Create an account' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
