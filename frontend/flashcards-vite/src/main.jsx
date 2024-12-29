import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastProvider } from "./components/Toast"

//import App from './App.jsx'

const domContainer = document.getElementById("root");
const root = ReactDOM.createRoot(domContainer);

root.render(
  <StrictMode>
    <ToastProvider>
    <App/>
    </ToastProvider>
  </StrictMode>
);
