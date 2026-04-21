import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');
if (!container.__reactRoot) {
  container.__reactRoot = createRoot(container);
}

container.__reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
