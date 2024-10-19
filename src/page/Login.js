import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import logo from '../img/logo.png'; // Đường dẫn đến file logo (đảm bảo đường dẫn chính xác)
import { handleLogin } from '../API/API_Login';
import { validateEmail, validatePassword } from '../middlewares/Validate';



const Login = () => {

  const [Email, setEmail] = useState('phamdinhcang350@gmail.com')
  const [Password, setPassword] = useState('Admin@123')

  const login = () => {
    if(validateEmail(Email) == true && validatePassword(Password)){
      handleLogin(Email, Password)
    }
  }

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Đăng Nhập Vào Tài Khoản</h1>
        <p style={styles.subtitle}>Chào mừng trở lại! Vui lòng nhập thông tin chi tiết.</p>
        <form>
          <div style={styles.form_group}>
            <label htmlFor="name" style={styles.label}>Email</label>
            <input
              type="text"
              placeholder="Nhập Email"
              style={styles.input}
              value={Email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.form_group}>
            <label htmlFor="password" style={styles.label}>Mật khẩu</label>
            <input
              type='password'
              placeholder="Nhập mật khẩu"
              style={styles.input}
              value={Password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={styles.button}
            onClick={() => login()}
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;



const styles = {
  loginPage: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginLeft: '20px',
    marginRight: '20px',
  },
  loginContainer: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  logo: {
    width: '80px', // Kích thước logo
    height: '80px', // Kích thước logo
    marginBottom: '20px', // Khoảng cách dưới logo
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '12px',
    color: '#6c757d',
    marginBottom: '20px',
  },
  form_group: {
    width: '100%'
  },
  label: {
    width: '100%',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    borderColor: '#ced4da',
    marginBottom: '15px',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#ff6f61',
    borderColor: '#ff6f61',
    width: '100%',
  },
};
