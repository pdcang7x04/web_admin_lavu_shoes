import React from 'react';

const UpdateModal = ({ isCategoryPage, newItem, setNewItem, setIsModalUpdateOpen, handleEditItem }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result }); // Lưu đường dẫn tạm thời
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{isCategoryPage ? 'Chỉnh Sửa Danh Mục' : 'Chỉnh Sửa Nhãn Hàng'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleEditItem(); }}>
          <label>Tên</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Nhập Tên"
            required
          />
          {!isCategoryPage && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Sử dụng hàm handleFileChange
              />
              {newItem.image && (
                <img src={newItem.image} alt="Preview" className="product-image-preview" />
              )}
            </>
          )}
          <div className="modal-actions">
            <button type="button" onClick={() => setIsModalUpdateOpen(false)}>Hủy</button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
