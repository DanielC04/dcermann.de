import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.scss';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

/* GLOBAL VARIABLES */

(window as any).$primaryLanguage = 'en';
(window as any).$secondaryLanguage = 'de';
(window as any).$primaryLanguageIconId = 'primary-lang-icon';
(window as any).$secondaryLanguageIconId = 'secondary-lang-icon';


const router = createBrowserRouter([{
	path: '/',
	element: <App />	
}]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
