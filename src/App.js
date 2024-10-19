import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './page/Products';
import Sidebar from './page/Sidepart'; 
import Login from './page/Login';
import CategoryPage from './page/Category';
import AccountPage from './page/Accounts';
import OrderPage from './page/Order';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Trang chính */}
        <Route path="/sidebar" element={<Sidebar />} /> {/* Trang chính */}
        <Route path="/products" element={<ProductPage />} /> {/* Trang sản phẩm */}
        <Route path="/category" element={<CategoryPage />} /> {/* Trang sản phẩm */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrderPage />} /> 
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
};

export default App;
