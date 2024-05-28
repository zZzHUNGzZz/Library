import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { RoleProvider } from './components/context/RoleContext';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);

root.render(
   <BrowserRouter>
      <React.StrictMode>
         <RoleProvider>
            <App />
         </RoleProvider>
      </React.StrictMode >
   </BrowserRouter >
);

reportWebVitals();
