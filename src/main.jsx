import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './component/context/AuthContext.jsx';


// Create a root and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    
    
  </React.StrictMode>
);
