import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';

import AdminPanel from './Admin_Pages/adminPanel';
import ShopApp from './ShopApp';

function MainApp() {
    const isLoggedIn = !!localStorage.getItem('userData');
    const storedUserData = localStorage.getItem('userData');
    const [role, setRole] = useState('');

    useEffect(() => {
        const userData = JSON.parse(storedUserData);
        if (userData && userData.therole) {
            setRole(userData.therole);
        }
    }, [storedUserData]);

    return (
        <>
            {isLoggedIn ? (
                role === 'admin' ? <AdminPanel /> : <ShopApp />
            ) : (
                <ShopApp />
            )}
        </>
    );
}

export default MainApp;