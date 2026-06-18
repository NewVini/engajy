import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Sem StrictMode: o fluxo da loja (store.js) faz integração imperativa com o DOM
// e o double-invoke do StrictMode em dev duplicaria os listeners.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
