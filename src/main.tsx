import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

/**
 * Einstiegspunkt der Uhrzeit-Abenteuer App.
 * 
 * Rendert die App-Komponente in das Root-Element.
 * StrictMode ist aktiviert für bessere Entwickler-Erfahrung.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
