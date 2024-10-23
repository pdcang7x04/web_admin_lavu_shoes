import React, { useState } from "react";
import '../Modal/ProductModal.css';

const ProductModal = (props) => {
  const { isModalOpen, setIsModalOpen, newProduct, setNewProduct, handleAddProduct } = props
  const [Name, setName] = useState('')
  const [Price, setPrice] = useState(0)
  const [CurrentQuantity, setCurrentQuantity] = useState(0)
  const [Description, setDescription] = useState('')
  const [Image, setImage] = useState([])
  const [Color, setColor] = useState({})
  const [colorInput, setColorInput] = useState({ name: '', image: '' });
  const [Size, setSize] = useState({})
  const [Status, setStatus] = useState(1)
  const [Brand, setBrand] = useState('')
  const [Category, setCategory] = useState('')

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Chuyển đổi FileList thành mảng
    setImage((prevImages) => {
      // Kiểm tra xem prevImages có phải là mảng không
      if (!Array.isArray(prevImages)) {
        return files; // Nếu không phải là mảng, trả về mảng mới
      }
      return [...prevImages, ...files]; // Kết hợp mảng hiện tại với hình ảnh mới
    });
  };

  const handleAddColor = () => {
    if (colorInput.name && colorInput.image) {
      setColor([...Color, colorInput]); // Thêm màu mới vào mảng
      setColorInput({ name: '', image: '' }); // Reset input sau khi thêm
    }
  };

  const fetchAddNewProduct = async () => {
    try {
      const body = {
        name: Name,
        price: Price,
        currentQuantity: CurrentQuantity,
        description: Description,
        images: Image,
        colors: Color,
        sizes: Size,
        status: Status,
        brand: Brand,
        category: Category
      }
      console.log('body: ', body)
    } catch (error) {
      console.log('error: ', error)
    }
  }
  if (!isModalOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thêm Sản Phẩm</h3>
          <button className="close" onClick={() => setIsModalOpen(false)}>×</button>
        </div>

        <div className="image-upload">
          {Image.length > 0 ? (
            <>
              {Image.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} className="product-image-preview"
                  style={{
                    width: 100,
                    height: 100,
                    margin: 5,
                    borderRadius: 10
                  }}
                />
              ))}
              <div className="image-placeholder">
                <input type="file" multiple onChange={(e) => handleImageChange(e)} />
              </div>
            </>
          ) : (
            <div className="image-placeholder">
              <p>Kéo hình ảnh vào đây hoặc nhấn để chọn</p>
              <input type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e)} />
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <label>Tên Sản Phẩm</label>
          <input type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Nhập Tên SP" required />

          <label>Giá Sản Phẩm</label>
          <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Nhập Giá SP" required />

          <label>Số Lượng Sản Phẩm</label>
          <input type="number" value={CurrentQuantity} onChange={(e) => setCurrentQuantity(e.target.value)} placeholder="Số lượng SP" required />

          <label>Mô Tả</label>
          <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Nhập Mô Tả SP" required />

          <label>Màu Sản Phẩm</label>
          <input
            type="text"
            name="name"
            value={colorInput.name}
            onChange={(e) => setColorInput({ name: e.target.value })}
            placeholder="Nhập Tên Màu"
            required
          />
          <input
            type="text"
            name="image"
            value={colorInput.image}
            onChange={(e) => setColorInput({image: e.target.value })}
            placeholder="Nhập URL Hình Ảnh"
            required
          />
          <button onClick={handleAddColor}>Thêm Màu</button>


          <label>Kích Thước Sản Phẩm</label>
          <input type="text" value={Size} onChange={(e) => setSize(e.target.value.split(',').map(Number))} placeholder="Nhập Kích Thước SP" required />

          <label>Thương Hiệu Sản Phẩm</label>
          <select value={Brand} onChange={(e) => setBrand(e.target.value)} required>
            <option value="">Chọn Thương Hiệu</option>
            <option value="brand1">Thương Hiệu 1</option>
            <option value="brand2">Thương Hiệu 2</option>
            <option value="brand3">Thương Hiệu 3</option>
          </select>

          <label>Loại Sản Phẩm</label>
          <select value={Category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Chọn Thương Hiệu</option>
            <option value="brand1">Thương Hiệu 1</option>
            <option value="brand2">Thương Hiệu 2</option>
            <option value="brand3">Thương Hiệu 3</option>
          </select>

          <label>Trạng Thái Sản Phẩm</label>
          <select value={Status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Chọn Thương Hiệu</option>
            <option value="brand1">Thương Hiệu 1</option>
            <option value="brand2">Thương Hiệu 2</option>
            <option value="brand3">Thương Hiệu 3</option>
          </select>



          <div className="modal-footer">
            <button type="button" className="cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
            <button type="submit" className="submit" onClick={() => fetchAddNewProduct()}>Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
