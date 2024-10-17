import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './page/Products';
import Sidebar from './page/Sidepart'; 
import Login from './page/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Trang chính */}
        <Route path="/sidebar" element={<Sidebar />} /> {/* Trang chính */}
        <Route path="/products" element={<ProductPage />} /> {/* Trang sản phẩm */}
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
};

export default App;
