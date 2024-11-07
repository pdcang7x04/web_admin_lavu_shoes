import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getSalesAnhPurchase } from '../API/API_Stats';

Chart.register(...registerables);

const SalesAndPurchase = () => {
    const [Month, setMonth] = useState([])
    const [Sales, setSales] = useState([]);
    const [Purchase, setPurchase] = useState([])
    const [Revenue, setRevenue] = useState([]);
    const [Profit, setProfit] = useState([]);

    const fetchGetSalesAndPurchase = async () => {
        try{
        const response = await fetch(`http://localhost:3000/orders/getSalesAnhPurchase`,)
            const result = await response.json();
            if (result.status) {
                const tempMonths = [];
                const tempSales = [];
                const tempPurchase = [];
                const tempRevenue = [];
                const tempProfit = [];

                for (const monthKey in result.data) {
                    if (result.data.hasOwnProperty(monthKey)) {
                        const monthData = result.data[monthKey];
                        const month = monthData.month;
                        const sales = monthData.sales;
                        const purchase = monthData.purchase;
                        const revenue = monthData.revenue; // Assuming revenue is available
                        const profit = monthData.profit; // Assuming profit is available

                        console.log('doanh thu: ', revenue)
                        tempMonths.push(month);
                        tempSales.push(sales);
                        tempPurchase.push(purchase);
                        tempRevenue.push(revenue);
                        tempProfit.push(profit);
                    }
                }

                setMonth(['Aug', 'Sep', ...tempMonths]);  // Spread operator added for correct array formation
            setSales([30, 52, ...tempSales]);          // Spread operator for sales
            setPurchase([28, 48, ...tempPurchase]);    // Spread operator for purchases
            setRevenue([1000000, 1500000, ...tempRevenue]); // Example hardcoded values for revenue
            setProfit([200000, 300000, ...tempProfit]);
            }
        } catch (error) {
            console.log(error);
        }

    }
  const data = {
    labels: Month,
    datasets: [
      {
        label: 'Mua',
        data: Sales, 
        backgroundColor: 'rgba(0, 191, 255, 1)', 
        borderColor: 'rgba(0, 191, 255, 1)',
        borderWidth: 1,
        borderRadius: 40
      },
      {
        label: 'Bán',
        data: Purchase, 
        backgroundColor: 'rgba(34, 139, 34, 1)', 
        borderColor: 'rgba(34, 139, 34, 1)', 
        borderWidth: 1,
        borderRadius: 40
      },
      {
        label: 'Doanh Thu',
        data: Revenue, 
        backgroundColor: 'rgba(255, 165, 0, 1)', // Orange
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
        borderRadius: 40
    },
    {
        label: 'Lợi Nhuận',
        data: Profit, 
        backgroundColor: 'rgba(255, 0, 0, 1)', // Red
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
        borderRadius: 40
    }
    ]
  };


  useEffect(() => {
    fetchGetSalesAndPurchase()
  }, [])
  

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{width: 690, height: 360}}>
        <h4>Sales & Purchase</h4>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default SalesAndPurchase;