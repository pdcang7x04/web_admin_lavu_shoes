import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart';
import '../Style/Order.css';

const Order = () => {
  const [orders, setorders] = useState([]);
  const [Page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ id: null, name: '' });

  useEffect(() => {
    const fetchorders = async () => {
      const fetchedorders = [
        { id: 1, customerName: 'Customer 1', orderDate: '2022-11-12', productCount: 4, status: 'Đã giao hàng' },
        { id: 2, customerName: 'Customer 2', orderDate: '2022-12-21', productCount: 2, status: 'Đang xử lý' },
        { id: 3, customerName: 'Customer 3', orderDate: '2022-05-12', productCount: 6, status: 'Đã hủy' },
        { id: 4, customerName: 'Customer 4', orderDate: '2022-08-12', productCount: 4, status: 'Đang giao hàng' },
        { id: 5, customerName: 'Customer 5', orderDate: '2023-09-23', productCount: 5, status: 'Đã giao hàng' },
        { id: 6, customerName: 'Customer 6', orderDate: '2023-09-23', productCount: 1, status: 'Đã hủy' },
      ];
      setorders(fetchedorders);
    };

    fetchorders();
  }, []);

  const handleAddOrEditOrder = () => {
    if (newOrder.id) {
      setorders(orders.map(cat => cat.id === newOrder.id ? newOrder : cat));
    } else {
      const newId = orders.length ? Math.max(orders.map(cat => cat.id)) + 1 : 1;
      setorders([...orders, { ...newOrder, id: newId }]);
    }
    setIsModalOpen(false);
    setNewOrder({ id: null, name: '' });
  };

  const handleEditOrder = (Order) => {
    setNewOrder(Order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (confirmDelete) {
      setorders(orders.filter(cat => cat.id !== id));
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
            <span className="text_sp">Quản Lý Đơn Hàng</span>
            <div className="button_header">
              <img className="icon20" src={require('../img/sort.png')} alt="sort" />
              Bộ lọc
            </div>
          </div>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID Đơn Hàng</th>
                <th>ID Người Mua</th>
                <th>Ngày Đặt Hàng</th>
                <th>Tổng Số Sản Phẩm</th>
                <th>Tình Trạng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((Order) => (
                <tr key={Order.id}>
                  <td>{Order.id}</td>
                  <td>{Order.customerName}</td>
                  <td>{Order.orderDate}</td>
                  <td>{Order.productCount}</td>
                  <td className={`${Order.status === 'Đã giao hàng' ? 'completed' : Order.status === 'Đang xử lý' ? 'processing' : 'cancelled'}`}>
                    {Order.status}
                  </td>
                  <td>
                    <button className="btn-action edit" onClick={() => handleEditOrder(Order)}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDeleteOrder(Order.id)}>
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
            <span>Trang {Page}/{Math.ceil(orders.length / 10)}</span>
            <button onClick={() => {
              if (Page >= Math.ceil(orders.length / 10)) return;
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>{newOrder.id ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục"}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditOrder(); }}>
                <label>Tên Danh Mục</label>
                <input
                  type="text"
                  value={newOrder.name}
                  onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                  placeholder="Nhập Tên Danh Mục"
                  required
                />
                <div className="modal-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)}>Hủy</button>
                  <button type="submit">{newOrder.id ? "Cập Nhật" : "Thêm"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;