import React, { useEffect, useState } from 'react';
import Sidebar from './Sidepart';
import '../Style/Category.css';
import AddModal from '../Modal/AddOrEditModal';
import EditModal from '../Modal/UpdateModal';
import { addNewCategory, deleteCategory, getCategoryByQuery, updateCategory } from '../API/API_Category';
import { getBrand, addNewBrand, deleteBrand, updateBrand } from '../API/API_Brand';

const CategoryAndBrand = () => {
  const [isCategoryPage, setIsCategoryPage] = useState(true);
  const [data, setData] = useState([]);
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(3);
  const [Keywords, setKeywords] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', image: '' });

  useEffect(() => {
    const fetchData = async () => {
      if (isCategoryPage) {
        const data = await getCategoryByQuery(Page, Limit, Keywords);
        setData(data);
      } else {
        const data = await getBrand(Page, Limit, Keywords);
        setData(data);
      }
    };
    
    fetchData();
  }, [Page, Limit, Keywords, isCategoryPage]);

  const handleAddOrEditItem = async () => {
    try {
      const addNew = isCategoryPage
        ? await addNewCategory({ name: newItem.name })
        : await addNewBrand(newItem);

      if (addNew) {
        setNewItem({ name: '', image: '' });
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditItem = async () => {
    try {
      const body = {
        name: newItem.name,
        image: newItem.image,
      };
      const update = isCategoryPage
        ? await updateCategory(newItem.id, { name: newItem.name })
        : await updateBrand(newItem.id, body);

      if (update) {
        setNewItem({ name: '', image: '' });
        setIsModalUpdateOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const deleteItem = isCategoryPage ? await deleteCategory(id) : await deleteBrand(id);
      if (deleteItem) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="background">
      <Sidebar />
      <div className="product_page">
        <div className="header">
          <form className="search-bar">
            <div className="search-input-wrapper">
              <img src={require('../img/search.png')} alt="search" className="icon24" />
              <input
                value={Keywords}
                onChange={(e) => setKeywords(e.target.value)}
                type="text"
                placeholder="Tìm kiếm"
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
            <span className="text_sp">{isCategoryPage ? 'Danh Mục Sản Phẩm' : 'Danh Sách Nhãn Hàng'}</span>
            <div className="button_header">
              <button className="btn-add" onClick={() => setIsModalOpen(true)}>Thêm</button>
              <button className="btn-download">Tải tất cả</button>
              <button onClick={() => setIsCategoryPage(!isCategoryPage)}>
            {isCategoryPage ? 'Xem nhãn hàng' : 'Xem danh mục'}
          </button>
            </div>
            
          </div>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                {!isCategoryPage && <th>Hình Ảnh</th>}
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  {!isCategoryPage && (
                    <td>
                      <img src={item.image} alt={item.name} className="product-image-preview" />
                    </td>
                  )}
                  <td>
                    <button className="btn-action edit" onClick={() => {
                      setIsModalUpdateOpen(true);
                      setNewItem({ id: item._id, name: item.name, image: item.image });
                    }}>
                      <img className="icon24" src={require('../img/edit.png')} alt="edit" />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDeleteItem(item._id)}>
                      <img className="icon24" src={require('../img/delete.png')} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => Page > 1 && setPage(Page - 1)}>Trước</button>
            <span>Trang {Page} / {data?.totalPages}</span>
            <button onClick={() => Page < data?.totalPages && setPage(Page + 1)}>Sau</button>
          </div>
        </div>
        
        {isModalOpen && (
          <AddModal
            isCategoryPage={isCategoryPage}
            newItem={newItem}
            setNewItem={setNewItem}
            handleAddOrEditItem={handleAddOrEditItem}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {isModalUpdateOpen && (
          <EditModal
            isCategoryPage={isCategoryPage}
            newItem={newItem}
            setNewItem={setNewItem}
            handleEditItem={handleEditItem}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryAndBrand;
