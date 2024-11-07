import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import brand from '../img/brand.png';
import person from '../img/user-trust.png';
import setting from '../img/settings.png';
import logout from '../img/sign-out-alt.png';
import bar_chart from '../img/chart-histogram.png';
import box from '../img/order-history.png';
import product from '../img/box-open.png'
import '../Style/Sidepart.css'; // Import file CSS

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname); // Đặt mặc định là đường dẫn hiện tại

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div className="logobox">
        <img src={logo} alt="Logo" className="logo" />
        <span className="textLogo">LAVU’S SHOESHOP</span>
      </div>
      <ul className="ul_1">
        {['/products', '/category', '/account', '/orders', '/stats'].map((path, index) => (
          <li key={index} className="li">
            <Link
              to={path}
              className={`link ${activeItem === path ? 'activeLink' : ''}`}
              onClick={() => handleClick(path)}
            >
              <img
                src={path === '/products' ? product :
                     path === '/category' ? brand :
                     path === '/account' ? person :
                     path === '/orders' ? box :
                     bar_chart}
                alt={path.substring(1)}
                className="icon"
              />
              <span>{path === '/products' ? 'Sản Phẩm' :
                      path === '/category' ? 'Danh Mục & Nhãn Hàng' :
                      path === '/account' ? 'Tài Khoản' :
                      path === '/orders' ? 'Đơn Hàng' :
                      'Thống Kê'}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="ul2">
        <li className="li">
          <Link to="/settings" className="link" onClick={() => handleClick('/settings')}>
            <img src={setting} alt='setting' className="icon" />
            <span>Cài Đặt</span>
          </Link>
        </li>
        <li className="li">
          <Link to="/" className="link" onClick={() => handleClick('/')}>
            <img src={logout} alt='logout' className="icon" />
            <span>Đăng Xuất</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;