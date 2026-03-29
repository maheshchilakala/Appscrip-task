import React, { useEffect } from 'react';
import styles from './SidebarMenu.module.css';
import { useShop } from '../context/ShopContext';

const SidebarMenu = ({ isOpen, onClose, navCategories, onCategorySelect, selectedCategory }) => {
  const { user, setIsAuthOpen } = useShop();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className={styles['sidebar-backdrop']} onClick={onClose} />}

      {/* Slide-out Menu */}
      <aside className={`${styles['sidebar-menu']} ${isOpen ? styles['sidebar-menu--open'] : ''}`}>
        <div className={styles['sidebar-menu__header']}>
          <h2>Menu</h2>
          <button onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        <div className={styles['sidebar-menu__content']}>
          <section className={styles['sidebar-menu__section']}>
            <h3>Categories</h3>
            <ul>
              {navCategories.map((cat) => (
                <li key={cat.label}>
                  <button
                    className={`${styles['sidebar-menu__link']} ${selectedCategory === cat.apiCategory || (!selectedCategory && cat.apiCategory === 'All') ? styles['sidebar-menu__link--active'] : ''}`}
                    onClick={() => {
                      onCategorySelect(cat.apiCategory);
                      onClose();
                    }}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles['sidebar-menu__section']}>
            <h3>Account</h3>
            <ul>
              {user && user.name !== 'Guest' ? (
                <li><button className={styles['sidebar-menu__link']}>Profile ({user.name})</button></li>
              ) : (
                <li>
                  <button 
                    className={styles['sidebar-menu__link']}
                    onClick={() => { setIsAuthOpen(true); onClose(); }}
                  >
                    Login / Register / Guest
                  </button>
                </li>
              )}
            </ul>
          </section>

          <section className={styles['sidebar-menu__section']}>
            <h3>Preferences</h3>
            <ul>
              <li><button className={styles['sidebar-menu__link']}>Language: English</button></li>
              <li><button className={styles['sidebar-menu__link']}>Currency: USD ($)</button></li>
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;
