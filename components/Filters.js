import React, { useState } from 'react';
import styles from './Filters.module.css';

const categories = ['All', "Men's Clothing", "Women's Clothing", 'Jewelery', 'Electronics'];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 – $50', min: 25, max: 50 },
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

const ratings = [5, 4, 3, 2, 1];

const Filters = ({ selectedCategory, onCategoryChange, selectedPriceRange, onPriceChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className={styles.filters} aria-label="Product filters">
      <div className={styles['filters__header']}>
        <h2 className={styles['filters__title']}>Filters</h2>
      </div>

      {/* Category Filter */}
      <section className={styles['filters__section']} aria-label="Filter by category">
        <button
          className={styles['filters__section-toggle']}
          onClick={() => toggleSection('category')}
          aria-expanded={expandedSections.category}
        >
          <span>Category</span>
          <svg
            width="12" height="12"
            viewBox="0 0 12 12"
            className={expandedSections.category ? styles['filters__chevron--open'] : ''}
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {expandedSections.category && (
          <ul className={styles['filters__options']} role="list">
            {categories.map((cat) => (
              <li key={cat}>
                <label className={styles['filters__option']}>
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat || (cat === 'All' && !selectedCategory)}
                    onChange={() => onCategoryChange(cat)}
                    className={styles['filters__checkbox']}
                  />
                  <span>{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Price Range Filter */}
      <section className={styles['filters__section']} aria-label="Filter by price">
        <button
          className={styles['filters__section-toggle']}
          onClick={() => toggleSection('price')}
          aria-expanded={expandedSections.price}
        >
          <span>Price</span>
          <svg
            width="12" height="12"
            viewBox="0 0 12 12"
            className={expandedSections.price ? styles['filters__chevron--open'] : ''}
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {expandedSections.price && (
          <ul className={styles['filters__options']} role="list">
            {priceRanges.map((range) => (
              <li key={range.label}>
                <label className={styles['filters__option']}>
                  <input
                    type="radio"
                    name="price-range"
                    checked={selectedPriceRange?.label === range.label}
                    onChange={() => onPriceChange(selectedPriceRange?.label === range.label ? null : range)}
                    onClick={() => {
                        // Allow deselection for radio
                        if (selectedPriceRange?.label === range.label) {
                            onPriceChange(null);
                        }
                    }}
                    className={styles['filters__radio']}
                  />
                  <span>{range.label}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Rating Filter */}
      <section className={styles['filters__section']} aria-label="Filter by rating">
        <button
          className={styles['filters__section-toggle']}
          onClick={() => toggleSection('rating')}
          aria-expanded={expandedSections.rating}
        >
          <span>Rating</span>
          <svg
            width="12" height="12"
            viewBox="0 0 12 12"
            className={expandedSections.rating ? styles['filters__chevron--open'] : ''}
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {expandedSections.rating && (
          <ul className={styles['filters__options']} role="list">
            {ratings.map((r) => (
              <li key={r}>
                <button className={styles['filters__option']} aria-label={`${r} stars and above`}>
                  <span className={styles['filters__stars']} aria-hidden="true">
                    {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                  </span>
                  <span className={styles['filters__stars-label']}>{r === 5 ? 'Only' : '& up'}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Clear filters */}
      <button
        className={styles['filters__clear']}
        onClick={() => {
          onCategoryChange('All');
          onPriceChange(null);
        }}
      >
        Clear all filters
      </button>
    </aside>
  );
};

export default Filters;
