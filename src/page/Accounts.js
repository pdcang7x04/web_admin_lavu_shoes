import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart'; // Đường dẫn tới thành phần Sidebar
import '../Style/Account.css'; // Đường dẫn tới file CSS của bạn
import { getUser } from '../API/API_User';

const Account = () => {
  const [accounts, setAccounts] = useState([]); // Khởi tạo accounts với đối tượng có thuộc tính data là mảng
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(6);
  const [Keywords, setKeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [newAccount, setNewAccount] = useState({ id: null, name: '', password: '', phonenumber: '', Email: '' }); // Trạng thái tài khoản mới hoặc đang chỉnh sửa

  useEffect(() => {
    // Hàm để lấy danh sách tài khoản
    getUser(Page, Limit, Keywords)
      .then((data) => {

        if (data) {
          // Lọc dữ liệu chỉ lấy những tài khoản có role = 1
          const filteredAccounts = data?.data?.filter(account => account.role === 1);
          setAccounts({
            data: filteredAccounts,
            total: data.total,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
          });
        } else {
          setAccounts({ data: [] }); // Nếu không có dữ liệu hợp lệ
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setAccounts({ data: [] }); // Khởi tạo với mảng rỗng khi có lỗi
      });
  }, [Page, Limit, Keywords]);



  return (
    <div className="background">
      <Sidebar />
      <div className="product_page">
        <div className="header">
          <form className="search-bar">
            <div className="search-input-wrapper">
              <img src={require('../img/search.png')} alt="bell" className="icon24" />
              <input
                value={Keywords}
                onChange={(e) => setKeywords(e.target.value)}
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
            <span className="text_sp">Quản Lý Đơn Hàng</span>
            <div className="button_header">
              <button className="btn-filter">
                <img className="icon20" src={require('../img/sort.png')} alt="sort" />
                Bộ lọc
              </button>
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
              {accounts?.data?.map((account) => (
                <tr key={account._id}>
                  <td>{account._id}</td>
                  <td>{account.username}</td>
                  <td>{account.phone}</td>
                  <td>{account.email}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => {
              if (Page === 1) return;
              setPage(Page - 1);
            }}>Trước</button>
            <span>Trang {Page}/{accounts?.totalPages}</span>
            <button onClick={() => {
              if (Page >= accounts?.totalPages) return;
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;
