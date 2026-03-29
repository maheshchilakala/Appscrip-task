import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Newsletter section */}
      <div className={styles['footer__newsletter']}>
        <div className={styles['footer__newsletter-inner']}>
          <div className={styles['footer__newsletter-text']}>
            <h2 className={styles['footer__newsletter-title']}>Join the Edit</h2>
            <p className={styles['footer__newsletter-sub']}>
              Curated drops, early access, and insider discounts.
            </p>
          </div>
          {subscribed ? (
            <p className={styles['footer__newsletter-success']}>Thank you for subscribing!</p>
          ) : (
            <form
              className={styles['footer__newsletter-form']}
              onSubmit={handleSubscribe}
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className={styles['footer__sr-only']}>
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                className={styles['footer__newsletter-input']}
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
              <button
                type="submit"
                className={styles['footer__newsletter-btn']}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links grid */}
      <div className={styles['footer__links']}>
        <div className={styles['footer__links-inner']}>
          <div className={styles['footer__brand-col']}>
            <span className={styles['footer__brand-name']}>MUSE</span>
            <p className={styles['footer__brand-desc']}>
              Thoughtfully curated products for the modern lifestyle.
            </p>
            <div className={styles['footer__social']} aria-label="Social media links">
              {['Instagram', 'Pinterest', 'Twitter'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className={styles['footer__social-link']}
                  aria-label={`Follow us on ${platform}`}
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          <nav className={styles['footer__nav-col']} aria-label="Shop links">
            <h3 className={styles['footer__nav-heading']}>Shop</h3>
            <ul role="list">
              {["Men's Clothing", "Women's Clothing", 'Jewellery', 'Electronics', 'New Arrivals', 'Sale'].map((link) => (
                <li key={link}>
                  <a href="#" className={styles['footer__nav-link']}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles['footer__nav-col']} aria-label="Help links">
            <h3 className={styles['footer__nav-heading']}>Help</h3>
            <ul role="list">
              {['FAQ', 'Shipping & Returns', 'Size Guide', 'Track Order', 'Contact Us', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className={styles['footer__nav-link']}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles['footer__nav-col']} aria-label="Company links">
            <h3 className={styles['footer__nav-heading']}>Company</h3>
            <ul role="list">
              {['About Us', 'Careers', 'Press', 'Sustainability', 'Affiliates', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className={styles['footer__nav-link']}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles['footer__bottom']}>
        <p className={styles['footer__copyright']}>
          © {new Date().getFullYear()} MUSE Curated Living. All rights reserved.
        </p>
        <div className={styles['footer__payment']}>
          {['VISA', 'MC', 'AMEX', 'PayPal'].map((method) => (
            <span key={method} className={styles['footer__payment-badge']}>{method}</span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
