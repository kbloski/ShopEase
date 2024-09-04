import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { basicUrl }  from './config/store.config.js';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';

import HomePage from './pages/HomePage/HomePage.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import ProductAdd from './pages/ProductAdd/ProductAdd.js';
import Store from './pages/Store/Store.js';
import ProductCard from './pages/ProductCard/ProductCard.js';
import ReviewAdd from './pages/ReviewAdd/ReviewAdd.js';
import Cart from './pages/Cart/Cart.js';
import { Checkout } from './pages/Checkout/Checkout.js';
import { AddressAdd } from './pages/AddressAdd/AddressAdd.js';

function App() {

  return (
    <div>
          <Routes>
            <Route path= { basicUrl } element={<HomePage />} />
            <Route path= { basicUrl + '/register'} element={ <Register /> } />
            <Route path= { basicUrl + '/login'} element={<Login />} />
            <Route path= { basicUrl + '/store' } element={<Store />} />
            <Route path= { basicUrl + '/product/add'} element={ <ProductAdd />} />
            <Route path= { basicUrl + '/product/:id/card'} element={<ProductCard />}/>
            <Route path= { basicUrl + '/product/:id/card'} element={<ProductCard />}/>
            <Route path= { basicUrl  + '/product/:id/review/add' } element={ <ReviewAdd />} />
            <Route path= {basicUrl + '/cart'} element={ <Cart /> } />
            <Route path={ basicUrl + '/checkout'} element={ <Checkout />} />
            <Route path={ basicUrl + '/address/add'} element={ <AddressAdd />} />
          </Routes>
    </div>
  );
}

function AppWraper(){
  // Dodanie navigacji dla wszystkich stron internetowych
  return (
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  )
}

export default AppWraper;
