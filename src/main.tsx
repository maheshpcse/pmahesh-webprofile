import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Always start at the top: the intro plays from the top and the browser's
// scroll restoration / hash jump would otherwise land mid-page on refresh.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
