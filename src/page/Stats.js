import React, { useEffect, useState } from "react";
import "../Style/Product.css";
import Sidebar from "./Sidepart.js";
import { success } from "../swal/Swal.js";
import ProductModal from "../Modal/ProductModal.js"; // Import component modal
import { addNewProduct, deleteProduct } from "../API/API_Product.js";
import UpdateProductModal from "../Modal/UpdateProductModal.js";
import SalesOverview from "../component/SalesOverview.js";
import InventorySummary from "../component/InventorySummary.js";
import PurchaseOverview from "../component/PurchaseOverview.js";
import ProductSummary from "../component/ProductSummary.js";
import SalesAndPurchase from "../component/SalesAndPurchase.js";
import OrderSummary from "../component/OrderSummary.js";
import TopSellingStock from "../component/TopSellingStock.js";
import LowQuantityStock from "../component/LowQuantityStock.js";

const Stats = () => {
  
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
              />
            </div>
          </form>
          <div className="icon_box1">
            <img src={require('../img/bell.png')} alt="bell" className="icon24" />
            <img src={require('../img/person.png')} alt="avatar" className="avatar" />
          </div>
        </div>

        <div className="product-container">
          <SalesOverview/>
        </div>
        <div className="product-container">
          <InventorySummary/>
        </div>
        <div className="product-container">
          <PurchaseOverview/>
        </div>
        <div className="product-container">
          <ProductSummary/>
        </div>
        <div className="product-container">
          <SalesAndPurchase/>
        </div>
        <div className="product-container">
          <OrderSummary/>
        </div>
        <div className="product-container">
          <TopSellingStock/>
        </div>
        <div className="product-container">
          <LowQuantityStock/>
        </div>

      </div>
    </div>
  );
};

export default Stats;
