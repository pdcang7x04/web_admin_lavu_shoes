import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart'; // Đường dẫn tới thành phần Sidebar
import '../Style/Account.css'; // Đường dẫn tới file CSS của bạn
import { getUser } from '../API/API_User';

const Account = () => {
  const [accounts, setaccounts] = useState([]);
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(20)
  const [Keywords, setKeywords] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [newAccount, setNewAccount] = useState({ id: null, name: '' }); // Trạng thái danh mục mới hoặc đang chỉnh sửa

  useEffect(() => {
    // Hàm để lấy danh sách danh mục (giả định API)
    getUser(Page, Limit, Keywords)
    .then((data) => {
      setaccounts(data)
    })
  }, [Page, Limit, Keywords]);

  console.log("account: ", accounts)

  const handleAddOrEditAccount = () => {
    if (newAccount.id) {
      // Chỉnh sửa danh mục
      setaccounts(accounts.map(cat => cat.id === newAccount.id ? newAccount : cat));
    } else {
      // Thêm danh mục mới
      const newId = accounts.length ? Math.max(accounts.map(cat => cat.id)) + 1 : 1;
      setaccounts([...accounts, { ...newAccount, id: newId }]);
    }
    setIsModalOpen(false); // Đóng modal
    setNewAccount({ id: null, name: '' }); // Reset form
  };

  const handleEditAccount = (Account) => {
    setNewAccount(Account); // Cập nhật thông tin danh mục đang chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  const handleDeleteAccount = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa Tài Khoản này?");
    if (confirmDelete) {
      setaccounts(accounts.filter(cat => cat.id !== id)); // Xóa danh mục
    }
  };

  return (
    <div className="background">
      <Sidebar />
      <div className="product_page">
        <div className="header">
          <form className="search-bar">
            <div className="search-input-wrapper">
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
                {/* <th>Mật Khẩu</th> */}
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts?.data?.map((Account) => (
                <tr key={Account.id}>
                  <td>{Account._id}</td>
                  <td>{Account.name}</td>
                  {/* <td>{Account.password}</td> */}
                  <td>{Account.phone}</td>
                  <td>{Account.email}</td>

                  <td>
                    <button className="btn-action edit" onClick={() => handleEditAccount(Account)}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDeleteAccount(Account.id)}>
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
            <span>Trang {Page}/{Math.ceil(accounts.length / 10)}</span>
            <button onClick={() => {
              if (Page >= Math.ceil(accounts.length / 10)) return;
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

        {/* Modal thêm hoặc chỉnh sửa danh mục */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>{newAccount.id ? "Chỉnh Sửa Account" : "Thêm Danh Mục"}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditAccount(); }}>
                <label>Account</label>
                <input
                  type="text"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="Nhập Tên Người Dùng"
                  required
                />
                <input
                  type="text"
                  value={newAccount.password}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="Mật Khẩu"
                  required
                />
                <input
                  type="text"
                  value={newAccount.phonenumber}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="Số Điện Thoại"
                  required
                />
                <input
                  type="text"
                  value={newAccount.Email}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
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