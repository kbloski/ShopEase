import { BrowserRouter, Route, Routes } from 'react-router-dom';

import storeConfig from './config/storeConfig.js';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';

import HomePage from './pages/HomePage/HomePage.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import ProductAdd from './pages/ProductAdd/ProductAdd.js';
import ProductView from './pages/ProductView/ProductView.js';


function App() {
  const {basicUrl} = storeConfig;

  return (
    <div>
          <Routes>
            <Route path= { basicUrl } element={<HomePage />} />
            <Route path= { basicUrl + '/register'} element={ <Register /> } />
            <Route path= { basicUrl + '/login'} element={<Login />} />
            <Route path= { basicUrl + '/product/add'} element={ <ProductAdd />} />
            <Route path= { basicUrl + '/product/view/:id' } element={<ProductView />} />
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
