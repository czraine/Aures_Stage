import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './AdminPage';
import App from '../App';
import Categ from '../Categories';
import Commande from '../Commande';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import MyComands from '../Client_Pages/MyComands';
import SidebarLayout from '../sideBar/SideBarLayout';
import SuspenseLoader from './components/SuspenseLoader';


const Loader = (Component: any) => (props: any) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);



// Dashboards
const Dashboard = Loader(lazy(() => import('./AdminPage')));
const Admin = Loader(lazy(() => import('./dashboard/index')));

// Pages
const Categorie = Loader(lazy(() => import('../Categories/index')));

const Produits = Loader(lazy(() => import('./../App')));
const Parameters = Loader(lazy(() => import('./testing')));

const Historique = Loader(
    lazy(() => import('../Commande'))
);

// Dashboards

//const Stats = Loader(lazy(() => import('src/content/dashboards/Stats')));

const AppRoutes: RouteObject[] = [
    {
        path: 'admin',
        element: <SidebarLayout />,
        children: [
            {
                path: '', // Use relative path
                element: <Navigate to="dashboard" replace />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'Users',
                element: <Admin />
            },
            {
                path: 'produits', // Use relative path
                element: <Produits />
            },
            {
                path: 'Categories', // Use relative path
                element: <Categorie />
            },
            {
                path: 'commandes', // Use relative path
                element: <Historique />
            }
            ,
            {
                path: 'Working_hours', // Use relative path
                element: <Parameters />
            }
        ]
    },
    {
        path: '',
        element: <Navigate to="Admin/dashboard" replace />
    }
];



export default AppRoutes;
