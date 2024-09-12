import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
import { DeliveryMethods } from './pages/DeliveryMethods/DeliveryMethods.js';

// import { 'shopeasy' }  from './config/store.config.js';
import { createUrl } from './common/createUrl.js';


function App() {

  return (
    <div>
          <Routes>
            <Route path= { createUrl() } element={<HomePage />} />
            <Route path= { createUrl('/register') } element={ <Register /> } />
            <Route path= { createUrl('/login') } element={<Login />} />
            <Route path= { createUrl('/store')  } element={<Store />} />
            <Route path= { createUrl('/product/add') } element={ <ProductAdd />} />
            <Route path= { createUrl('/product/:id/card') } element={<ProductCard />}/>
            <Route path= { createUrl('/product/:id/card') } element={<ProductCard />}/>
            <Route path= { createUrl('/product/:id/review/add') } element={ <ReviewAdd />} />
            <Route path= {createUrl('/cart') } element={ <Cart /> } />
            <Route path={ createUrl('/checkout') } element={ <Checkout />} />
            <Route path={ createUrl('/address/add') } element={ <AddressAdd />} />
            <Route path={ createUrl('/address/add') } element={ <AddressAdd />} />
            <Route path={ createUrl('/delivery/methods') } element={ <DeliveryMethods /> } />
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
