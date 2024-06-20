import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={rootReducer}>
      <PayPalScriptProvider deferLoading={true} options={{ clientId: "test" }}>
      <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
