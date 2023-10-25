import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';

import AdminPanel from './Admin_Pages/adminPanel';
import ShopApp from './ShopApp';
import MainApp from './mainApp';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(

  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <MainApp />

      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
);