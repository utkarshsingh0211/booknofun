import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { SearchContextProvider } from './contexts/SearchContext';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
      <Router>
      <App />
      </Router>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
