import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart';
import '../Style/Order.css';
import { formatDate, getOrder, updateStatusOrder } from '../API/API_Order';
import { getUserById } from '../API/API_User';
import { getProductById } from '../API/API_Product';
import { Alert } from 'bootstrap';
import { warning } from '../swal/Swal';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [Product, setProduct] = useState([])
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(6);
  const [Keywords, setKeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ id: null, customerName: '', orderDate: '', productCount: '', status: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);





  useEffect(() => {
    const fetchOrders = async () => {

      try {
        const data = await getOrder(Page, Limit, Keywords);
        console.log('order: ', orders)
        await setOrders(data);

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

  const handleEditOrder = async (id, currentStatus, paymentStatus) => {
    try {
      if (currentStatus <= 2 && paymentStatus == 6) {
        const body = { paymentStatus: paymentStatus }
        const update = await updateStatusOrder(id, body)
        if (update) {
          window.location.reload()
        }
        return
      }
      if ((currentStatus + 1) < paymentStatus) {
        warning("Hãy xử lý đơn hàng theo trình tự")
        return
      }
      const body = { paymentStatus: paymentStatus }
      const update = await updateStatusOrder(id, body)
      if (update) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const statusOrder = (value) => {

    switch (value) {
      case 1: return "Chờ xác nhận";
      case 2: return "Chờ xác nhận";
      case 3: return "Đã xác nhận";
      case 4: return "Đang xử lý";
      case 5: return "Đã giao";
      case 6: return "Đã hủy";
      default: return "Không xác định";
    }
  };
  const statusPayment = (value) => {
    if (value >= 2 || value < 7) {
      return "Đã thanh toán"
    } else {
      return "Chưa thanh toán"
    }
  }

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 1: return "#28a745";
      case 2: return "#28a745";
      case 3: return "#007bff";
      case 4: return "#ffc107";
      case 5: return "#6c757d";
      case 6: return "#dc3545";
      default: return "#000";
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
                <th>ID Đơn Hàng</th>
                <th>Tên Người Mua</th>
                <th>Ngày Đặt Hàng</th>
                <th>Tổng Số giá trị</th>
                <th>Tình Trạng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {!orders ?
                <tr>
                  <td colSpan="6">Không có đơn hàng nào.</td>
                </tr> :
                orders?.data?.map((order) => (
                  <tr key={order.id}>
                    <td>{order._id}</td>
                    <td>{order.user.username}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</td>
                    <td style={{ color: getPaymentMethodColor(order?.paymentStatus) }}>
                      {statusOrder(order?.paymentStatus)}
                    </td>
                    <td>

                      <button className="btn-action view" onClick={() => handleViewProduct(order)}>
                        <img className="icon24" src={require('../img/overview.png')} alt="view" />
                      </button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => {
              if (Page === 1) return;
              setPage(Page - 1);
            }}>Trước</button>
            <span>Trang {Page}/{orders?.totalPages}</span>
            <button onClick={() => {
              if (Page >= orders?.totalPages) return;
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

        

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
                <p><strong>Trạng thái: </strong>
                  <span style={{ fontWeight: 'bold', color: getPaymentMethodColor(selectedProduct.paymentStatus) }}>
                    {statusOrder(selectedProduct.paymentStatus)}
                  </span>
                </p>
              </div>
              <br />
              <div className='body-modal'>
                <h5>Thông tin khách hàng</h5>
                <p><strong>Tên khách hàng: </strong>{selectedProduct.user.username}</p>
                <p><strong>Địa chỉ: </strong>{selectedProduct.shippingAddress.address}</p>
                <p><strong>Số điện thoại: </strong>{selectedProduct.shippingAddress.phone}</p>
              </div>
              <br />
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
              <br />
              <div className='body-modal'>
                <p><strong>Tổng tiền: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.totalAmount - 30000)}</p>
                <p><strong>Chi Phí vận chuyển: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(30000)}</p>
                <p><strong>Giảm giá: </strong>0 đ</p>
              </div>
              <br />
              <div className='body-modal'>
                <p><strong>Tổng thanh toán: </strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.totalAmount)}</p>
                <p><strong>Phương thức thanh toán: </strong>{selectedProduct.paymentmethod}</p>
                <p><strong>Trạng thái thanh toán: </strong>
                  <span style={{ fontWeight: 'bold', color: getPaymentMethodColor(selectedProduct.paymentStatus) }}>
                    {statusPayment(selectedProduct.paymentStatus)}
                  </span>
                </p>
                <button type="button" onClick={() => handleEditOrder(selectedProduct._id, selectedProduct.paymentStatus, 3)}>Đã xác nhận</button>
                <button type="button" onClick={() => handleEditOrder(selectedProduct._id, selectedProduct.paymentStatus, 4)}>Đang xử lý</button>
                <button type="button" onClick={() => handleEditOrder(selectedProduct._id, selectedProduct.paymentStatus, 5)}>Đã giao</button>
                <button type="button" onClick={() => handleEditOrder(selectedProduct._id, selectedProduct.paymentStatus, 6)}>Hủy đơn</button>
              </div>
              <br />

              <div className="modal-actions">
                <button type="button" onClick={() => setIsViewModalOpen(false)}>Đóng</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
