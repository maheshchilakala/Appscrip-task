import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <section className={styles['product-grid-empty']} aria-live="polite">
        <p>No products match your current filters.</p>
        <p>Try adjusting or clearing your filters.</p>
      </section>
    );
  }

  return (
    <section aria-label={`Product listing — ${products.length} items`}>
      <h2 className={styles['product-grid__sr-heading']} id="product-grid-heading">
        Product Listing
      </h2>

      <ul
        className={styles['product-grid']}
        role="list"
        aria-labelledby="product-grid-heading"
      >
        {products.map((product) => (
          <li key={product.id} className={styles['product-grid__item']}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductGrid;
