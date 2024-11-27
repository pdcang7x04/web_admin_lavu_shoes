import React, { useEffect, useState } from "react";
import "../Style/Product.css";
import Sidebar from "./Sidepart";
import { success } from "../swal/Swal";
import ProductModal from "../Modal/ProductModal.js"; // Import component modal
import { addNewProduct, deleteProduct } from "../API/API_Product.js";
import UpdateProductModal from "../Modal/UpdateProductModal.js";
import * as XLSX from "xlsx"; // Import thư viện xlsx

const ProductList = () => {
  const [products, setProducts] = useState({});
  const [Page, setPage] = useState(1);
  const [limit, setlimit] = useState(6);
  const [keywords, setkeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/getProduct?page=${Page}&limit=${limit}&keywords=${keywords}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const result = await response.json();
      if (result.status) {
        setProducts(result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [Page, limit, keywords]);

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalUpdateOpen(true); // Open the modal
  };

  // Hàm xuất Excel
  const exportToExcel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/getProduct?limit=1000&keywords=${keywords || ''}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result.status) {
        const productsData = result.data.data.map((product) => ({
          "Tên Sản Phẩm": product.name,
          "Giá": product.price,
          "Số Lượng Còn": product.currentQuantity,
          "Ngày Nhập": product.date,
          "Sẵn Có": product.status !== 5 ? "Còn hàng" : "Hết hàng",
        }));
  
        const worksheet = XLSX.utils.json_to_sheet(productsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  
        XLSX.writeFile(workbook, "ProductList.xlsx");
        success("Đã tải xuống tệp Excel thành công!");
      }
    } catch (error) {
      console.error("Error exporting products:", error);
    }
  };

  const statusProduct = (quantity) => {
    if(quantity == 0) {
      return "Hết hàng"
    }
    if(quantity <= 10){
      return "Sắp hết hàng"
    }
    return "Còn hàng"
  }

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
                onChange={(e) => setkeywords(e.target.value)}
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
            <span className="text_sp">Sản Phẩm</span>
            <div className="button_header">
              <button className="btn-add" onClick={() => setIsModalOpen(true)}>Thêm SP</button>
              <button className="btn-filter">
                <img className="icon20" src={require('../img/sort.png')} alt="sort" />
                Bộ lọc
              </button>
              <button className="btn-download" onClick={exportToExcel}>Tải tất cả</button>
            </div>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Số Lượng Còn</th>
                <th>Ngày Nhập</th>
                <th>Sẵn Có</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.data?.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                  <td>{product.currentQuantity} Sản phẩm</td>
                  <td>{product.date}</td>
                  <td className={product.currentQuantity > 10 ? "status-available" : "status-out"}>
                    {statusProduct(product.currentQuantity)}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn-action edit" onClick={() => handleEditProduct(product)}>
                        <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                      </button>
                      <button className="btn-action delete" onClick={() => deleteProduct(product._id)}>
                        <img className="icon24" src={require('../img/delete.png')} alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => { if (Page > 1) setPage(Page - 1); }}>Trước</button>
            <span>Trang {Page}/{products?.data?.totalPages}</span>
            <button onClick={() => { if (Page < products?.data?.totalPages) setPage(Page + 1); }}>Sau</button>
          </div>
        </div>

        {/* modal thêm sp */}
        <ProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={(value) => setIsModalOpen(value)}
          selectedProduct={selectedProduct}
        />

        <UpdateProductModal
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={(value) => setIsModalUpdateOpen(value)}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductList;
