import React from 'react';

const AddOrEditModal = ({ isCategoryPage, newItem, setNewItem, setIsModalOpen, handleAddOrEditItem }) => {
  const handleFileChange = (e) => {
    // Chỉ lấy tệp đầu tiên trong danh sách các tệp
    const file = e.target.files[0];
    // Tạo một đối tượng URL để hiển thị hình ảnh (nếu cần)
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
        <h3>{isCategoryPage ? 'Thêm Danh Mục' : 'Thêm Nhãn Hàng'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditItem(); }}>
          <label>Tên</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Nhập Tên"
            required
          />
          {!isCategoryPage && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Sử dụng hàm handleFileChange
              required
            />
          )}
          <div className="modal-actions">
            <button type="button" onClick={() => setIsModalOpen(false)}>Hủy</button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditModal;
