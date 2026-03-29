import { ShopProvider } from '../context/ShopContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ShopProvider>
        <Component {...pageProps} />
      </ShopProvider>
    </ThemeProvider>
  );
}

