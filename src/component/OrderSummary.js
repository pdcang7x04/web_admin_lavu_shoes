import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const OrderSummary = () => {
    const [orderData, setOrderData] = useState({
        labels: [],
        ordered: [],
        delivered: [],
        canceled: []
    });

    const fetchGetOrderSummary = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/getOrderSummary`);
            const result = await response.json();
            if (result.status) {
                const tempLabels = [];
                const tempOrdered = [];
                const tempDelivered = [];
                const tempCanceled = [];

                for (const monthKey in result.data) {
                    if (result.data.hasOwnProperty(monthKey)) {
                        const monthData = result.data[monthKey];
                        tempLabels.push(monthData.month);
                        tempOrdered.push(monthData.ordered);
                        tempDelivered.push(monthData.delivered);
                        tempCanceled.push(monthData.canceled);
                    }
                }

                setOrderData({
                    labels: ['Aug', 'Sep', ...tempLabels],
                    ordered: [30,52,...tempOrdered],
                    delivered: [28,48,...tempDelivered],
                    canceled: [10,20,...tempCanceled]
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGetOrderSummary();
    }, []);
    console.log('Đã giao: ', orderData.delivered)
    useEffect(() => {
        const ctx = document.getElementById('myChart2').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: orderData.labels,
                datasets: [
                    {
                        label: 'Đơn hàng',
                        data: orderData.ordered,
                        backgroundColor: '#DBA362',
                        borderColor: '#DBA362',
                        borderWidth: 1,
                        borderRadius: 40
                    },
                    {
                        label: 'Đã giao',
                        data: orderData.delivered,
                        backgroundColor: '#B6D3FA',
                        borderColor: '#B6D3FA',
                        borderWidth: 1,
                        borderRadius: 40
                    },
                    {
                        label: 'Đã hủy',
                        data: orderData.canceled,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1,
                        borderRadius: 40
                    }
                ]
            },
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
    }, [orderData]);

    return (
        <div style={{ width: 690, height: 360 }}>
            <h4>Order Summary</h4>
            <canvas id="myChart2"></canvas>
        </div>
    );
};

export default OrderSummary;