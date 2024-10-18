import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import product_cart from '../img/product_cart.png';
import person from '../img/person.png';
import setting from '../img/setting.png';
import logout from '../img/logout.png';
import bar_chart from '../img/bar-chart.png';
import box from '../img/box.png';

const sidebarStyles = {
  sidebar: {
    width: '280px',
    backgroundColor: '#FFFFFF',
    height: '100vh',
    padding: '20px',
    boxShadow: '1px 0 5px rgba(0,0,0,0.1)',
    position: 'fixed',
    borderRadius: '0 5%',
  },
  logobox: {
    width: '240px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  textLogo: {
    fontSize: '20px',
    marginLeft: '5px',
    fontWeight: 'bold',
    color: '#F15E2B',
  },
  ul_1: {
    marginTop: '100px',
    listStyleType: 'none',
    padding: 0,
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    cursor: 'pointer',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    transition: 'filter 0.3s',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: '10px',
    transition: 'background-color 0.3s',
  },
  activeLink: {
    backgroundColor: '#F15E2B', // Màu cam khi mục được chọn
    color: '#FFFFFF', // Màu chữ trắng
  },
  ul2: {
    marginTop: '150px',
    listStyleType: 'none',
    padding: 0,
  },
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname); // Đặt mặc định là đường dẫn hiện tại

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.logobox}>
        <img src={logo} alt="Logo" style={sidebarStyles.logo} />
        <span style={sidebarStyles.textLogo}>LAVU’S SHOESHOP</span>
      </div>
      <ul style={sidebarStyles.ul_1}>
        {['/products', '/category', '/account', '/orders', '/stats'].map((path, index) => (
          <li key={index} style={sidebarStyles.li}>
            <Link
              to={path}
              style={{
                ...sidebarStyles.link,
                ...(activeItem === path ? sidebarStyles.activeLink : {})
              }}
              onClick={() => handleClick(path)}
            >
              <img
                src={path === '/products' ? product_cart :
                     path === '/category' ? product_cart :
                     path === '/account' ? person :
                     path === '/orders' ? box :
                     bar_chart}
                alt={path.substring(1)}
                style={sidebarStyles.icon}
              />
              <span>{path === '/products' ? 'Sản Phẩm' :
                      path === '/category' ? 'Danh Mục Sản Phẩm' :
                      path === '/account' ? 'Tài Khoản' :
                      path === '/orders' ? 'Đơn Hàng' :
                      'Thống Kê'}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul style={sidebarStyles.ul2}>
        <li style={sidebarStyles.li}>
          <Link to="/settings" style={sidebarStyles.link} onClick={() => handleClick('/settings')}>
            <img src={setting} alt='setting' style={sidebarStyles.icon} />
            <span>Cài Đặt</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/logout" style={sidebarStyles.link} onClick={() => handleClick('/logout')}>
            <img src={logout} alt='logout' style={sidebarStyles.icon} />
            <span>Đăng Xuất</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;