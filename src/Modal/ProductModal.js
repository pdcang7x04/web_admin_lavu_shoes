import React from "react";
import '../Modal/ProductModal.css';

const ProductModal = ({ isModalOpen, setIsModalOpen, newProduct, setNewProduct, handleAddProduct, handleImageChange }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thêm Sản Phẩm</h3>
          <button className="close" onClick={() => setIsModalOpen(false)}>×</button>
        </div>
        
        <div className="image-upload">
          {newProduct.images ? (
            <img src={URL.createObjectURL(newProduct.images)} alt="Product" className="product-image-preview" />
          ) : (
            <div className="image-placeholder">
              <p>Kéo hình ảnh vào đây hoặc nhấn để chọn</p>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <label>Tên Sản Phẩm</label>
          <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Nhập Tên SP" required />
          
          <label>Loại Sản Phẩm</label>
          <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Nhập Loại SP" required />
          
          <label>Giá Sản Phẩm</label>
          <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Giá SP" required />
          
          <label>Số Lượng SP</label>
          <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Nhập Số Lượng SP" required />

          <div className="modal-footer">
            <button type="button" className="cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
            <button type="submit" className="submit">Thêm SP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
