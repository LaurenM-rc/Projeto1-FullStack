import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { LojaProvider } from './contexts/LojaContext.jsx';
import { CarrinhoProvider } from './contexts/CarrinhoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LojaProvider>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </LojaProvider>
  </StrictMode>,
);
