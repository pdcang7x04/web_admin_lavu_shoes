import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart'; // Đường dẫn tới thành phần Sidebar
import '../Style/Category.css'; // Đường dẫn tới file CSS của bạn
import { addNewCategory, deleteCategory, getCategoryByQuery, updateCategory } from '../API/API_Category';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(20)
  const [Keywords, setKeywords] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [isModalUpdateOpen, setIsModaUpdatelOpen] = useState(false); // Trạng thái modal
  const [newCategory, setNewCategory] = useState(''); // Trạng thái danh mục mới hoặc đang chỉnh sửa

  useEffect(() => {
    getCategoryByQuery(Page, Limit, Keywords)
      .then((data) => {
        setCategories(data)
      })
  }, [Page, Limit, Keywords]);


  const handleAddOrEditCategory = async () => {
    try {
      const addnew = await addNewCategory({name : newCategory})
      if (addnew) {
        setNewCategory('')
        setIsModalOpen(false)
        window.location.reload()
      } else {
        return
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleEditCategory = async () => {
    try {
      const body = {
        name: newCategory.name,
      }
      const update = await updateCategory(newCategory.id, body)
      if(update){
        setNewCategory({})
        setIsModaUpdatelOpen(false)
        window.location.reload()
      }else{
        return
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const deleteitem = await deleteCategory(id)
      if (deleteitem) {
        window.location.reload()
      } else {
        return
      }
    } catch (error) {
      console.log(error.message)
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
            <span className="text_sp">Danh Mục Sản Phẩm</span>
            <div className="button_header">
              <button className="btn-add" onClick={() => setIsModalOpen(true)}>Thêm</button>
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
                <th>ID Danh Mục</th>
                <th>Tên Danh Mục</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.map((category) => (
                <tr key={category.id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button className="btn-action edit" onClick={() => {
                      setIsModaUpdatelOpen(true)
                      setNewCategory({
                        id: category._id,
                        name: category.name,
                      })
                    }}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDeleteCategory(category._id)}>
                      <img className="icon24" src={require('../img/delete.png')} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => {
              if (Page == 1) {
                return; // Quay lại trang trước
              }
              setPage(Page - 1)
            }}>Trước</button>
            <span>Trang {Page}/ {categories?.totalPages}</span>
            <button onClick={() => {
              if (Page >= categories?.totalPages) {
                return // Chuyển đến trang tiếp theo
              }
              setPage(Page + 1)
            }}>
              Sau
            </button>
          </div>
        </div>

        {/* Modal thêm hoặc chỉnh sửa danh mục */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thêm Danh Mục</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditCategory(); }}>
                <label>Tên Danh Mục</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nhập Tên Danh Mục"
                  required
                />

                <div className="modal-actions">
                  <button type="button" onClick={() => {
                    setIsModalOpen(false)
                    setNewCategory('')
                  }}>Hủy</button>
                  <button type="submit" onClick={() => handleAddOrEditCategory()}>Lưu</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isModalUpdateOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thêm Danh Mục</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditCategory(); }}>
                <label>Tên Danh Mục</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({id: newCategory.id, name: e.target.value})}
                  placeholder="Nhập Tên Danh Mục"
                  required
                />
                
                <div className="modal-actions">
                  <button type="button" onClick={() => {
                    setIsModaUpdatelOpen(false)
                    setNewCategory('')
                  }}>Hủy</button>
                  <button type="submit" onClick={() => handleEditCategory()}>Lưu</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;