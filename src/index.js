import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/app';
import store, { persistor } from './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const el = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
root.render(el);