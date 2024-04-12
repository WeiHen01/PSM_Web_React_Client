import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='105605642687-gm1690sj14am07c0v97f6io5q5lgsdl4.apps.googleusercontent.com'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
    
);

