import React, { useEffect, useState } from "react";
import '../Modal/ProductModal.css';
import { getAllBrand } from "../API/API_Brand";
import { getCategory } from "../API/API_Category";
import { addNewProduct } from "../API/API_Product";
import { validatePrice } from "../middlewares/Validate";

const ProductModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props

  const [Name, setName] = useState("")
  const [Price, setPrice] = useState(0)
  const [CurrentQuantity, setCurrentQuantity] = useState(0)
  const [Description, setDescription] = useState('')
  const [Image, setImage] = useState([])
  const [Color, setColor] = useState([])
  const [colorInput, setColorInput] = useState({ name: '', image: '' });
  const [Size, setSize] = useState([])
  const [Status, setStatus] = useState(1)
  const [Brand, setBrand] = useState([])
  const [SelectedBrand, setSelectedBrand] = useState('')
  const [Category, setCategory] = useState([])
  const [SelectedCate, setSelectedCate] = useState('')

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

  useEffect(() => {
    fetchBrand()
    fetchCategory()
  }, [])

  const fetchBrand = async () => {
    try {
      const data = await getAllBrand()
      if (data) {
        setBrand(data)
      } else { 
        setBrand([]) 
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategory = async () => {
    try {
      const data = await getCategory()
      if (data) {
        setCategory(data)
      } else { 
        setCategory([]) 
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        brand: SelectedBrand,
        category: SelectedCate
      }
      // console.log('body: ', body)
      addNewProduct(body)
      setIsModalOpen(false)
      window.location.reload()
      resetForm()
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const resetForm = () => {
    setName('');
    setPrice(0);
    setCurrentQuantity(0);
    setDescription('');
    setImage([]);
    setColorInput({ name: '', image: '' });
    setSize([]);
    setStatus(1);
    setSelectedBrand('');
    setSelectedCate('');
};
  if (!isModalOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thêm Sản Phẩm</h3>
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

        <form>
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
          <input type="file" accept="image/*" multiple onChange={(e) => setColorInput({ image: e.target.value })} required/>
          
          <button type="button" onClick={handleAddColor}>Thêm Màu</button>
          {Array.isArray(Color) && Color.length > 0 ? (
            Color.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Chưa có màu nào được thêm.</td>
            </tr>
          )}
          <label>Kích Thước Sản Phẩm</label>
          <input type="text" value={Size} onChange={(e) => setSize(e.target.value.split(',').map(Number))} placeholder="Nhập Kích Thước SP" required />

          <label>Thương Hiệu Sản Phẩm</label>
          <select value={SelectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} required>
            <option value="">Chọn Thương Hiệu</option>
            {
              Brand?.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))
            }
          </select>

          <label>Loại Sản Phẩm</label>
          <select value={SelectedCate} onChange={(e) => setSelectedCate(e.target.value)} required>
            <option value="">Chọn Loại</option>
            {
              Category?.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))
            }
          </select>

          <label>Trạng Thái Sản Phẩm</label>
          <select value={Status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Chọn Thương Hiệu</option>
            <option value="1">Mới nhất</option>
            <option value="2">Bán chạy</option>
            <option value="3">Phổ biến</option>
            <option value="4">Sản phẩm giới hạn</option>
            <option value="5">Hết hàng</option>
          </select>



          <div className="modal-footer">
            <button type="button" className="cancel" onClick={() => {
              resetForm()
              setIsModalOpen(false)
            }}>Hủy</button>
            <button type="submit" className="submit" onClick={() => fetchAddNewProduct()}>Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
