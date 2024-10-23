import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart'; // Đường dẫn tới thành phần Sidebar
import '../Style/Account.css'; // Đường dẫn tới file CSS của bạn
import { getUser } from '../API/API_User';

const Account = () => {
  const [accounts, setAccounts] = useState({ data: [] }); // Khởi tạo accounts với đối tượng có thuộc tính data là mảng
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(20);
  const [Keywords, setKeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [newAccount, setNewAccount] = useState({ id: null, name: '', password: '', phonenumber: '', Email: '' }); // Trạng thái tài khoản mới hoặc đang chỉnh sửa

  useEffect(() => {
    // Hàm để lấy danh sách tài khoản
    getUser(Page, Limit, Keywords)
      .then((data) => {
        setAccounts(data || { data: [] }); // Bảo đảm accounts luôn có thuộc tính data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setAccounts({ data: [] }); // Khởi tạo với mảng rỗng khi có lỗi
      });
  }, [Page, Limit, Keywords]);

  const handleAddOrEditAccount = () => {
    if (newAccount.id) {
      // Chỉnh sửa tài khoản
      setAccounts(prev => ({
        ...prev,
        data: prev.data.map(acc => acc.id === newAccount.id ? newAccount : acc),
      }));
    } else {
      // Thêm tài khoản mới
      const newId = accounts.data.length ? Math.max(accounts.data.map(acc => acc.id)) + 1 : 1;
      setAccounts(prev => ({
        ...prev,
        data: [...prev.data, { ...newAccount, id: newId }],
      }));
    }
    setIsModalOpen(false); // Đóng modal
    setNewAccount({ id: null, name: '', password: '', phonenumber: '', Email: '' }); // Reset form
  };

  const handleEditAccount = (account) => {
    setNewAccount(account); // Cập nhật thông tin tài khoản đang chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  const handleDeleteAccount = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa Tài Khoản này?");
    if (confirmDelete) {
      setAccounts(prev => ({
        ...prev,
        data: prev.data.filter(acc => acc.id !== id), // Xóa tài khoản
      }));
    }
  };

  return (
    <div className="background">
      <Sidebar />
      <div className="product_page">
        <div className="header">
          <form className="search-bar">
            <div className="search-input-wrapper">
            <img src={require('../img/search.png')} alt="bell" className="icon24" />
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm sản phẩm, nhà cung cấp, đặt hàng"
              />
            </div>
          </form>
          <div className="icon_box1">
            <img src={require('../img/bell.png')} alt="bell" className="icon24" />
            <img src={require('../img/person.png')} alt="avatar" className="avatar" />
          </div>
        </div>
        <div className="product-container">
          <div className="table-header">
            <span className="text_sp">Quản Lý Tài Khoản</span>
            <div className="button_header">
              <img className="icon20" src={require('../img/sort.png')} alt="sort" />
              Bộ lọc
            </div>
          </div>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID Người Dùng</th>
                <th>Tên Người Dùng</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.data.map((account) => (
                <tr key={account.id}>
                  <td>{account._id}</td>
                  <td>{account.name}</td>
                  <td>{account.phone}</td>
                  <td>{account.email}</td>
                  <td>
                    <button className="btn-action edit" onClick={() => handleEditAccount(account)}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDeleteAccount(account.id)}>
                      <img className="icon24" src={require('../img/delete.png')} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => {
              if (Page === 1) return;
              setPage(Page - 1);
            }}>Trước</button>
            <span>Trang {Page}/{Math.ceil(accounts.data.length / Limit)}</span>
            <button onClick={() => {
              if (Page >= Math.ceil(accounts.data.length / Limit)) return;
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

        {/* Modal thêm hoặc chỉnh sửa tài khoản */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>{newAccount.id ? "Chỉnh Sửa Tài Khoản" : "Thêm Tài Khoản"}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditAccount(); }}>
                <label>Tên Tài Khoản</label>
                <input
                  type="text"
                  value={newAccount.name || ''} // Đảm bảo có giá trị mặc định
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="Nhập Tên Người Dùng"
                  required
                />
                <label>Mật Khẩu</label>
                <input
                  type="password"
                  value={newAccount.password || ''} // Đảm bảo có giá trị mặc định
                  onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                  placeholder="Mật Khẩu"
                  required
                />
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  value={newAccount.phonenumber || ''} // Đảm bảo có giá trị mặc định
                  onChange={(e) => setNewAccount({ ...newAccount, phonenumber: e.target.value })}
                  placeholder="Số Điện Thoại"
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  value={newAccount.Email || ''} // Đảm bảo có giá trị mặc định
                  onChange={(e) => setNewAccount({ ...newAccount, Email: e.target.value })}
                  placeholder="Email"
                  required
                />
                <div className="modal-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)}>Hủy</button>
                  <button type="submit">{newAccount.id ? "Cập Nhật" : "Thêm"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
