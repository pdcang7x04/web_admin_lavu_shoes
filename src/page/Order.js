import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart';
import '../Style/Order.css';
import { formatDate, getOrder } from '../API/API_Order';
import { getUserById } from '../API/API_User';
import { getProductById } from '../API/API_Product';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [Product, setProduct] = useState([])
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(20)
  const [Keywords, setKeywords] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ id: null, customerName: '', orderDate: '', productCount: '', status: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrder(Page, Limit, Keywords);
        await setOrders(data);
        // data.data.forEach((item) => {
        //   const user =  getUserById(item.user)

        //   console.log(item.orderDetail.product_id)
        // });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [Page, Limit, Keywords]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedProduct?.orderDetail) {
        const productPromises = selectedProduct.orderDetail.map((item) => getProductById(item.product_id));
        const productsData = await Promise.all(productPromises);
        setProduct(productsData);
      }
    };

    fetchProducts();
  }, [selectedProduct]);

  const handleAddOrEditOrder = () => {
    if (newOrder.id) {
      setOrders(orders.map(order => order.id === newOrder.id ? newOrder : order));
    } else {
      const newId = orders.length ? Math.max(orders.map(order => order.id)) + 1 : 1;
      setOrders([...orders, { ...newOrder, id: newId }]);
    }
    setIsModalOpen(false);
    setNewOrder({ id: null, customerName: '', orderDate: '', productCount: '', status: '' });
  };

  const handleEditOrder = (order) => {
    setNewOrder(order);
    setIsModalOpen(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const statusOrder = (value) => {
    if (value == 1) {
      return "Chưa thanh thoán"
    }
    if (value == 2) {
      return "Đã thanh toán"
    }
    if (value == 3) {
      return "Đang xử lý"
    }
    if (value == 4) {
      return "Đang giao"
    }
    if (value == 5) {
      return "Đã giao"
    }
    if (value == 6) {
      return "Đã hủy"
    }
  }

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
                <th>Tổng Số giá trị</th>
                <th>Tình Trạng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order) => (
                <tr key={order.id}>
                  <td>{order._id}</td>
                  <td>{order.user.username}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</td>
                  <td className={`${order.status === 'Đã giao hàng' ? 'completed' : order.status === 'Đang xử lý' ? 'processing' : 'cancelled'}`}>
                    {statusOrder(order?.paymentStatus)}
                  </td>
                  <td>
                    <button className="btn-action edit" onClick={() => handleEditOrder(order)}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action view" onClick={() => handleViewProduct(order)}>
                      <img className="icon24" src={require('../img/image.png')} alt="view" />
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
              <h3>{newOrder.id ? "Chỉnh Sửa Đơn Hàng" : "Thêm Đơn Hàng"}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditOrder(); }}>
                <label>ID Người Mua</label>
                <input
                  type="text"
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  placeholder="Nhập Tên Người Mua"
                  required
                />
                <label>Ngày Đặt Hàng</label>
                <input
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
                  required
                />
                <label>Tổng Số Sản Phẩm</label>
                <input
                  type="number"
                  value={newOrder.productCount}
                  onChange={(e) => setNewOrder({ ...newOrder, productCount: e.target.value })}
                  placeholder="Nhập Số Sản Phẩm"
                  required
                />
                <label>Tình Trạng</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  required
                >
                  <option value="">Chọn Tình Trạng</option>
                  <option value="Đã giao hàng">Đã giao hàng</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                  <option value="Đang giao hàng">Đang giao hàng</option>
                </select>

                <div className="modal-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)}>Hủy</button>
                  <button type="submit">{newOrder.id ? "Cập Nhật" : "Thêm"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

{isViewModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chi Tiết Sản Phẩm</h3>
            <p><strong>ID Đơn Hàng:</strong> {selectedProduct._id}</p>
            <p><strong>ID Người Mua:</strong> {selectedProduct.user.name}</p>
            <p><strong>Ngày Đặt Hàng:</strong> {formatDate(selectedProduct.createdAt)}</p>
            <p><strong>Tổng Số Sản Phẩm:</strong>
              <table>
                <thead>
                  <tr>
                    <th>Tên Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Màu</th>
                    <th>Kích Thước</th>
                  </tr>
                </thead>
                <tbody>
                  {Product.map((product, index) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                      <td>{selectedProduct.orderDetail[index].quantity}</td>
                      <td>{selectedProduct.orderDetail[index].color}</td>
                      <td>{selectedProduct.orderDetail[index].size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </p>
            <p><strong>Tình Trạng:</strong> {statusOrder(selectedProduct.paymentStatus)}</p>

            <div className="modal-actions">
              <button type="button" onClick={() => setIsViewModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Order;