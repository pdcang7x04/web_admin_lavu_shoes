import React, { useState } from "react";
import "../Style/Product.css";
import Sidebar from "./Sidepart.js";
import SalesOverview from "../component/SalesOverview.js";
import InventorySummary from "../component/InventorySummary.js";
import PurchaseOverview from "../component/PurchaseOverview.js";
import ProductSummary from "../component/ProductSummary.js";
import SalesAndPurchase from "../component/SalesAndPurchase.js";
import OrderSummary from "../component/OrderSummary.js";
import TopSellingStock from "../component/TopSellingStock.js";
import LowQuantityStock from "../component/LowQuantityStock.js";

const Stats = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = () => {
    setPage((prevPage) => (prevPage % 5) + 1); // Cycles through pages 1, 2, 3, 4, and 5
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
            <span className="text_sp">Trang {page}</span>
            <div className="button_header">
              <button onClick={handlePageChange} className="toggle-button">
                {`Chuyển sang Trang ${page === 1 ? "2" : page === 2 ? "3" : page === 3 ? "4" : page === 4 ? "5" : "1"}`}
              </button>
            </div>
          </div>

          {page === 1 && (
            <>
              <SalesOverview />
              <InventorySummary />
              <PurchaseOverview />
            </>
          )}
          {page === 2 && <SalesAndPurchase />}
          {page === 3 && (
            <>
              <OrderSummary />

            </>
          )}
          {page === 4 && (<> <ProductSummary />
            <TopSellingStock /> </>)}
          {page === 5 && <LowQuantityStock />}
        </div>
      </div>
    </div>
  );
};

export default Stats;
