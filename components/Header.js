import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import SidebarMenu from './SidebarMenu';

const Header = ({ selectedCategory, onCategorySelect, searchQuery, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { wishlist, getCartCount, setIsCartOpen, setIsAuthOpen, setIsWishlistOpen, user } = useShop();
  const { theme, toggleTheme } = useTheme();

  const navCategories = [
    { label: 'Shop All', apiCategory: 'All' },
    { label: 'Apparel', apiCategory: "men's clothing" }, 
    { label: 'Jewellery', apiCategory: 'jewelery' },
    { label: 'Electronics', apiCategory: 'electronics' },
  ];

  // Esc key closure for Search
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
    <header className={styles.header} role="banner">
      {/* Top announcement bar */}
      <div className={styles['header__announcement']}>
        <p>Lot of 3 or more is 10% off &mdash; use code <strong>BUNDLE10</strong></p>
      </div>

      {/* Main header row */}
      <div className={styles['header__main']}>
        {/* Left nav */}
        <nav className={styles['header__nav-left']} aria-label="Utility navigation">
          <button className={styles['header__logo-text']} onClick={() => setIsMenuOpen(true)}>
            <span aria-hidden="true">≡</span>
          </button>
          <button className={styles['header__nav-link']} aria-label="Toggle search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </nav>

        {/* Logo / Brand */}
        <a href="/" className={styles['header__brand']} aria-label="MUSE — Go to homepage">
          <span className={styles['header__brand-name']}>MUSE</span>
          <span className={styles['header__brand-tagline']}>Curated Living</span>
        </a>

        {/* Right nav */}
        <nav className={styles['header__nav-right']} aria-label="Account navigation">
          {user && user.name !== 'Guest' && (
            <span style={{ fontSize: '13px', marginRight: '8px', color: 'var(--color-text-secondary)' }}>
              Hi, {user.name}
            </span>
          )}
          
          <button className={styles['header__nav-link']} aria-label="Toggle theme" onClick={toggleTheme} style={{ marginRight: '4px' }}>
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <button className={styles['header__nav-link']} aria-label="Wishlist" onClick={() => setIsWishlistOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlist.length > 0 && <span className={styles['header__icon-badge']}>{wishlist.length}</span>}
          </button>
          
          <button className={styles['header__nav-link']} aria-label="Shopping bag" onClick={() => setIsCartOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {getCartCount() > 0 && <span className={styles['header__icon-badge']}>{getCartCount()}</span>}
          </button>
          
          <button className={styles['header__nav-link']} aria-label="Account" onClick={() => setIsAuthOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </nav>
      </div>

      {/* Category navigation */}
      <nav className={styles['header__categories']} aria-label="Product categories">
        <ul className={styles['header__categories-list']} role="list">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.apiCategory || (!selectedCategory && cat.apiCategory === 'All');
            return (
              <li key={cat.label}>
                <button
                  onClick={() => onCategorySelect && onCategorySelect(cat.apiCategory)}
                  className={`${styles['header__category-link']} ${isActive ? styles['header__category-link--active'] : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Search Input Bar (Drops down) */}
      <div className={`${styles['header__search-container']} ${isSearchOpen ? styles['header__search-container--open'] : ''}`}>
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search for products by title or category..." 
          className={styles['header__search-input']}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products field"
        />
        <button className={styles['header__search-close']} onClick={() => setIsSearchOpen(false)} aria-label="Close search">✕</button>
      </div>
    </header>
    
    {/* Slide-out Sidebar */}
    <SidebarMenu 
      isOpen={isMenuOpen} 
      onClose={() => setIsMenuOpen(false)} 
      navCategories={navCategories}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
    />
  </>
  );
};

export default Header;
