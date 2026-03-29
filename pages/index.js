import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import AuthModal from '../components/AuthModal';
import styles from '../styles/Home.module.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Home({ products, error }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...(products || [])]);

  // Debounce the search query by 300ms to improve performance (CS Grad Perspective)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter + sort products via useEffect for real-time Live Filtering 
  React.useEffect(() => {
    let result = [...(products || [])];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    if (selectedPriceRange) {
      result = result.filter(
        (p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
      );
    }

    // Search filter (using debounced query for 300ms performance boost)
    if (debouncedQuery.trim() !== '') {
      const query = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedPriceRange, sortBy, debouncedQuery]);

  // JSON-LD Schema for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Product Listing — MUSE Curated Living',
    description: 'Browse our curated collection of fashion, jewellery, and electronics.',
    numberOfItems: filteredProducts.length,
    itemListElement: filteredProducts.slice(0, 10).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: product.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: product.rating.rate,
              reviewCount: product.rating.count,
            }
          : undefined,
      },
    })),
  };

  // Generate dynamic title
  const categoryTitleMap = {
    'All': 'Product Listing Page — MUSE Curated Living',
    "men's clothing": 'Shop Best Men\'s Clothing — MUSE Curated Living',
    "women's clothing": 'Shop Best Women\'s Clothing — MUSE Curated Living',
    'jewelery': 'Shop Best Jewellery — MUSE Curated Living',
    'electronics': 'Shop Best Electronics — MUSE Curated Living',
  };
  const pageTitle = categoryTitleMap[selectedCategory] || 'Product Listing Page — MUSE Curated Living';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Browse our curated collection of ${selectedCategory === 'All' ? 'fashion, jewellery, and electronics' : selectedCategory}. Discover the latest styles with advanced filters, free shipping, and easy returns.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* ... */}
        <meta property="og:title" content={pageTitle} />
        {/* ... */}
        <meta name="twitter:title" content={pageTitle} />

        <link rel="canonical" href="https://appscrip-task.netlify.app/" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className={styles['page-wrapper']}>
        <Header 
          selectedCategory={selectedCategory} 
          onCategorySelect={setSelectedCategory} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CartDrawer />
        <WishlistDrawer />
        <AuthModal />

        <main id="main-content" role="main">
          {/* Hero banner */}
          <section className={styles['hero-banner']} aria-label="Page hero">
            <p className={styles['hero-banner__breadcrumb']}>
              Home / Collections
            </p>
            <h1 className={styles['hero-banner__title']}>Discover the Collection</h1>
            <p className={styles['hero-banner__description']}>
              Thoughtfully curated pieces spanning apparel, fine jewellery, and cutting-edge electronics — crafted for the modern lifestyle.
            </p>
          </section>

          {/* Toolbar */}
          <div className={styles.toolbar} role="toolbar" aria-label="Product list controls">
            <p className={styles['toolbar__count']}>
              Showing <strong>{filteredProducts.length}</strong> of {products?.length || 0} products
            </p>

            <div className={styles['toolbar__right']}>
              {/* Sort */}
              <div className={styles['toolbar__sort']}>
                <label htmlFor="sort-select" className={styles['toolbar__sort-label']}>
                  Sort:
                </label>
                <select
                  id="sort-select"
                  className={styles['toolbar__sort-select']}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter toggle */}
              <button
                className={styles['toolbar__filter-toggle']}
                onClick={() => setShowFilters(!showFilters)}
                aria-expanded={showFilters}
                aria-controls="filter-sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="8" y1="12" x2="20" y2="12"/>
                  <line x1="12" y1="18" x2="20" y2="18"/>
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          {/* Content area: sidebar + grid */}
          <div className={styles['content-area']}>
            <aside id="filter-sidebar" className={showFilters ? '' : styles['sidebar--hidden']} style={showFilters ? {} : {display: 'none'}}>
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                onPriceChange={setSelectedPriceRange}
              />
            </aside>

            <section className={styles['products-section']}>
              {error ? (
                <div role="alert" style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--color-surface)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>Collections Unavailable</h2>
                  <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                    Our core servers are currently syncing the latest luxury inventory. Please refresh the page in a moment.
                  </p>
                </div>
              ) : products?.length === 0 ? (
                <div style={{ padding: '64px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Loading the MUSE Collection...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                  No products found matching your search.
                </div>
              ) : (
                <ProductGrid products={filteredProducts} />
              )}

              {/* Pagination */}
              <nav className={styles.pagination} aria-label="Product page navigation">
                <button className={styles['pagination__btn']} aria-label="Previous page" disabled>
                  ‹
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`${styles['pagination__btn']} ${page === 1 ? styles['pagination__btn--active'] : ''}`}
                    aria-label={`Page ${page}`}
                    aria-current={page === 1 ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
                <button className={styles['pagination__btn']} aria-label="Next page">
                  ›
                </button>
              </nav>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

/**
 * Server-Side Rendering — fetches products from Fake Store API
 * on every request for fresh data and SEO benefits.
 */
export async function getServerSideProps() {
  try {
    // 8-second timeout to prevent Netlify 10-second serverless function crash
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('https://fakestoreapi.com/products', {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const fetchedProducts = await res.json();
    
    // Multiply the products array to simulate a larger store (MUSE aesthetic needs a robust grid)
    const products = [];
    for (let i = 0; i < 4; i++) {
        products.push(...fetchedProducts.map(p => ({ ...p, id: p.id + (i * 1000) })));
    }

    return {
      props: {
        products,
        error: null,
      },
    };
  } catch (err) {
    console.error('Failed to fetch products:', err.message);

    return {
      props: {
        products: [],
        error: true,
      },
    };
  }
}
