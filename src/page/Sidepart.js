import React from 'react';
import { Form, Link } from 'react-router-dom';
import logo from '../img/logo.png';
import product_cart from '../img/product_cart.png';
import person from '../img/person.png'
import setting from '../img/setting.png'
import logout from '../img/logout.png'
import bar_chart from '../img/bar-chart.png'
import box from '../img/box.png'

const sidebarStyles = {
  sidebar: {
    width: '280px',
    backgroundColor: '#FFFFFF',
    height: '100vh',
    padding: '20px',
    boxShadow: '1px 0 5px rgba(0,0,0,0.1)',
    position: 'fixed',
    borderRadius: '0 5% '
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
    padding: 0
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px'
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    transition: 'filter 0.3s', // Thêm transition cho icon khi hover
  },
  link: {
    display: 'flex', // Đảm bảo hình ảnh và chữ cùng nằm trên một dòng
    alignItems: 'center',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'color 0.3s', // Thêm transition cho màu chữ khi hover
  },
  ul2: {
    marginTop: '150px',
    listStyleType: 'none',
    padding: 0,
  },
};

const Sidebar = () => {
  return (
    <div style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.logobox}>
        <img src={logo} alt="Logo" style={sidebarStyles.logo} />
        <span style={sidebarStyles.textLogo}>LAVU’S SHOESHOP</span>
      </div>
      <ul style={sidebarStyles.ul_1}>
        <li style={sidebarStyles.li}>
          <Link to="/products" style={sidebarStyles.link}>
            <img src={product_cart} alt='product_cart' style={sidebarStyles.icon} />
            <span>Sản Phẩm</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/categories" style={sidebarStyles.link}>
            <img src={product_cart} alt='product_cart' style={sidebarStyles.icon} />
            <span>Danh Mục Sản Phẩm</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/account" style={sidebarStyles.link}>
            <img src={person} alt='person' style={sidebarStyles.icon} />
            <span>Tài Khoản</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/orders" style={sidebarStyles.link}>
            <img src={box} alt='box' style={sidebarStyles.icon} />
            <span>Đơn Hàng</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/stats" style={sidebarStyles.link}>
            <img src={bar_chart} alt='bar_chart' style={sidebarStyles.icon} />
            <span>thống kê</span>
          </Link>
        </li>
      </ul>

      <ul style={sidebarStyles.ul2}>
        <li style={sidebarStyles.li}>
          <Link to="/stats" style={sidebarStyles.link}>
            <img src={setting} alt='setting' style={sidebarStyles.icon} />
            <span>Cài Đặt</span>
          </Link>
        </li>
        <li style={sidebarStyles.li}>
          <Link to="/stats" style={sidebarStyles.link}>
            <img src={logout} alt='logout' style={sidebarStyles.icon} />
            <span>Đăng Xuất</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
