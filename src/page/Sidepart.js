import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import product_cart from '../img/product_cart.png';
import person from '../img/person.png';
import setting from '../img/setting.png';
import logout from '../img/logout.png';
import bar_chart from '../img/bar-chart.png';
import box from '../img/box.png';
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
        {['/products', '/category', '/brand', '/account', '/orders', '/stats'].map((path, index) => (
          <li key={index} className="li">
            <Link
              to={path}
              className={`link ${activeItem === path ? 'activeLink' : ''}`}
              onClick={() => handleClick(path)}
            >
              <img
                src={path === '/products' ? product_cart :
                     path === '/category' ? product_cart :
                     path === '/brand' ? product_cart :
                     path === '/account' ? person :
                     path === '/orders' ? box :
                     bar_chart}
                alt={path.substring(1)}
                className="icon"
              />
              <span>{path === '/products' ? 'Sản Phẩm' :
                      path === '/category' ? 'Danh Mục Sản Phẩm' :
                      path === '/brand' ? 'Danh Mục Nhãn Hàng' :
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