import React, { useEffect, useState } from "react";
import "../Style/Product.css";
import Sidebar from "./Sidepart";
import { success } from "../swal/Swal";
import ProductModal from "../Modal/ProductModal.js"; // Import component modal

const ProductList = () => {
  const [products, setProducts] = useState({});
  const [Page, setPage] = useState(1);
  const [limit, setlimit] = useState(6);
  const [keywords, setkeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    currentQuantity: '', 
    description: '', 
    images: '', 
    colors: '', 
    sizes: '', 
    status: '', 
    brand: '', 
    category: ''
  });

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

  const handleAddProduct = () => {
    const newId = products.length + 1;
    const productToAdd = { ...newProduct, id: newId };
    setProducts([...products, productToAdd]);
    setIsModalOpen(false); 
    setNewProduct({ name: "", category: "", price: "", stock: "", image: null });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
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
              <button className="btn-download">Tải tất cả</button>
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
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                  <td>{product.currentQuantity} Sản phẩm</td>
                  <td>{product.date}</td>
                  <td className={product.status !== 5 ? "status-available" : "status-out"}>
                    {product.status !== 5 ? "Còn hàng" : "Hết hàng"}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn-action edit">
                        <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                      </button>
                      <button className="btn-action delete">
                        <img className="icon24" src={require('../img/delete.png')} alt="delete" />
                      </button>
                    </div>
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
            <span>Trang {Page}/{products?.data?.totalPages}</span>
            <button onClick={() => {
              if (Page >= products?.data?.totalPages) return; 
              setPage(Page + 1);
            }}>
              Sau
            </button>
          </div>
        </div>

        {/* Sử dụng component ProductModal */}
        <ProductModal 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
