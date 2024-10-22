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
    console.log(order)
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const statusOrder = (value) => {
    if (value == 1 || value == 2) {
      return "Chờ xác nhận"
    }
    if (value == 3) {
      return "Đã xác nhận"
    }
    if (value == 4) {
      return "Đang xử lý"
    }
    if (value == 5) {
      return "Đang giao"
    }
    if (value == 6) {
      return "Đã giao"
    }
    if (value == 7) {
      return "Đã hủy"
    }
  }

  const statusPayment = (value) => {
    if(value >= 2 || value < 7){
      return "Đã thanh toán"
    }else{
      return "Chưa thanh toán"
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
                  value={newOrder.user.username}
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
              <div className='body-modal'>
                <h3>Lavu's shoes</h3>
                <p><strong>Địa chỉ:</strong>Chưa có</p>
                <p><strong>Số điện thoại:</strong>Chưa có</p>
                <p><strong>Email:</strong>Chưa có</p>
              </div>

              <div className='body-modal'>
                <p><strong>Mã đơn hàng: </strong>{selectedProduct._id}</p>
                <p><strong>Ngày đặt hàng: </strong>{formatDate(selectedProduct.createdAt)}</p>
                <p><strong>Trạng thái: </strong>{statusOrder(selectedProduct.paymentStatus)}</p>
              </div>
              <br/>
              <div className='body-modal'>
                <h5>Thông tin khách hàng</h5>
                <p><strong>Tên khách hàng: </strong>{selectedProduct.user.username}</p>
                <p><strong>Địa chỉ: </strong>{selectedProduct.shippingAddress.address}</p>
                <p><strong>Số điện thoại: </strong>{selectedProduct.shippingAddress.phone}</p>
              </div>
              <br/>
              <div className='detail-product'>
                <h3>Chi tiết sản phẩm</h3>
                <table className='detail-table'>
                  <thead>
                    <tr>
                      <th className='detail-th'>Tên Sản Phẩm</th>
                      <th className='detail-th'>Mã sản phẩm</th>
                      <th className='detail-th'>Màu sắc</th>
                      <th className='detail-th'>Kích thước</th>
                      <th className='detail-th'>Số lượng</th>
                      <th className='detail-th'>Giá</th>
                      <th className='detail-th'>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Product.map((product, index) => (
                      <tr key={product._id}>
                        <td className='detail-td'>{product.name}</td>
                        <td className='detail-td'>{product._id}</td>
                        <td className='detail-td'>{selectedProduct.orderDetail[index].color}</td>
                        <td className='detail-td'>{selectedProduct.orderDetail[index].size}</td>
                        <td className='detail-td'>{selectedProduct.orderDetail[index].quantity}</td>
                        <td className='detail-td'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                        <td className='detail-td'>
                          {
                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              product.price * selectedProduct.orderDetail[index].quantity
                            )
                          }
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br/>
              <div className='body-modal'>
                <p><strong>Tổng tiền: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.totalAmount-30000)}</p>
                <p><strong>Chi Phí vận chuyển: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(30000)}</p>
                <p><strong>Giảm giá: </strong>0 đ</p>
              </div>
              <br/>
              <div className='body-modal'>
                <p><strong>Tổng thanh toán: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.totalAmount)}</p>
                <p><strong>Phương thức thanh toán: </strong>{selectedProduct.paymentmethod}</p>
                <p><strong>Trạng thái thanh toán: </strong>{statusPayment(selectedProduct.paymentStatus)}</p>
              </div>
              <br/>
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