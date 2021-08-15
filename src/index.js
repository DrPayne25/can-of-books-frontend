import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";



// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ccettuzw.us.auth0.com"
      clientId="uMhH1dItkLxpKU9YnTG5zvTnGeAXIWrQ"
      redirectUri='http://localhost:3000'
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
