
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';
import { JWTProvider } from './context/JWTContext'; // Ensure this path is correct

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <JWTProvider>
      <App />
    </JWTProvider>
  </Provider>
);
