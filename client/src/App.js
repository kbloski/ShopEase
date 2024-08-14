import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import storeConfig from './config/storeConfig.js';

import Navigation from './components/Navigation/Navigation.js';
import HomePage from './pages/HomePage/HomePage.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';

function App() {
  const {basicUrl} = storeConfig;

  return (
    <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path= { basicUrl } element={<HomePage />} />
          <Route path= { basicUrl + '/register'} element={ <Register /> } />
          <Route path= { basicUrl + '/login'} element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
