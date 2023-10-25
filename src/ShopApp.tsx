import { Routes, Route, Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { useParams } from 'react-router-dom';

import Header from './Client_Pages/Header';

import App from './App';
import Login from './login/index';
import Categ from './Categories/index';
import Commande from './Commande/index';
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import Store from "./Client_Pages/Store";
import Products from "./Client_Pages/Products/Products";
import ProdsByCateg from './Client_Pages/Category/ProdsByCateg';

import AdminHeader from "./Admin_Pages/AdminHeader";
import AdminPanel from "./Admin_Pages/adminPanel";
import Footer from "./Client_Pages/Footer";
import MyComands from "./Client_Pages/MyComands";
import Thefooter from "./Client_Pages/Footer/footer";
import DashboardCrypto from "./Admin_Pages/dashboard";
import TopClient from "./Admin_Pages/dashboard/dashboards/Stats/TopClient";
import BarChart from "./Admin_Pages/dashboard/dashboards/Stats/BarChart";
import ClientCatgory from "./Client_Pages/Category/ClientCatgory";
import ClientModif from "./Client_Pages/ClientModif";

function ShopApp() {

  return (
    <div>
      <ShoppingCartProvider>

        <>
          <Routes>
            <Route path="/product" element={<><Header /><Products /><Thefooter /></>} />
            <Route path="/category" element={<><Header /><ClientCatgory /><Thefooter /></>} />
            <Route path="/Mycomands" element={<><Header /><MyComands /><Thefooter /></>} />
            <Route path="/" element={<><Header /><Store /><Thefooter /></>} />
            <Route path="/Settings" element={<><Header /><ClientModif /><Thefooter /></>} />

            <Route path="/product/:id" element={<ProdByCateg />} />

          </Routes>

          <Outlet />
        </>

      </ShoppingCartProvider>

      <Routes>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div >
  )
}

export default ShopApp
const ProdByCateg = () => {
  const { id } = useParams(); // Extract the 'id' from the URL params

  // Your component logic here
  return (
    <div>
      <Header />
      <ProdsByCateg id={id} />
      <Thefooter />   </div>
  );
};