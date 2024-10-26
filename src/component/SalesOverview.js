import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../API/API_Product'

const SalesOverview = () => {
  const [Sales, setSales] = useState(0)
  const [Revenue, setRevenue] = useState(0)
  const [Profit, setProfit] = useState(0)
  const [Cost, setCost] = useState(100000000)
  const [CostInput, setCostInput] = useState(Number(0))

  // tính tổng toàn bộ số liệu ko phân theo thời gian
  const revenue = async () => {
    try {
      const data = await getAllProduct();
      let sumRevenue = 0;
      data.forEach((item) => {
        sumRevenue += item.quantitySold * item.price;
      });
      setRevenue(sumRevenue);
      setProfit(sumRevenue - Cost)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    revenue()
    
  }, [Revenue])

  return (
    <div>
      <div>
        <h4>Giảm giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Sales)}</h4>
      </div>

      <div>
        <h4>Doanh thu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Revenue)}</h4>
      </div>

      <div>
        <h4>Lợi nhuận: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Profit)}</h4>
      </div>

      <div>
        <h4>Chi phí: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Cost)}</h4>
      </div>
    </div>
  )
}

export default SalesOverview

