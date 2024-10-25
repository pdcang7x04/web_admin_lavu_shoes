import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
const Charts = () => {

    const [Month, setMonth] = useState([])
    const [TotalQuantity, setTotalQuantity] = useState([]);
    const [TotalValue, setTotalValue] = useState([])

    const thongke = async () => {
        try {
            const response = await fetch(`http://localhost:3107/carts/statistics`,)
            const result = await response.json();
            if (result.status) {
                const tempMonths = [];
                const tempTotalQuantities = [];
                const tempTotalValues = [];

                for (const monthKey in result.data) {
                    if (result.data.hasOwnProperty(monthKey)) {
                        const monthData = result.data[monthKey];
                        const month = monthData.month;
                        const totalQuantity = monthData.total_quantity;
                        const totalValue = monthData.total_value;

                        tempMonths.push(month);
                        tempTotalQuantities.push(totalQuantity);
                        tempTotalValues.push(totalValue);
                    }
                }

                setMonth(tempMonths);
                setTotalQuantity(tempTotalQuantities);
                setTotalValue(tempTotalValues);
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        thongke()

    }, [])
    console.log('month: ', Month)
    var myChart = null;
    const render = () => {
        const ctx = document.getElementById('myChart');
        if (myChart) {
            myChart.clear();
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Month,
                datasets: [
                    {
                        label: 'Total',
                        data: TotalQuantity,
                        borderWidth: 1
                    },
                    {
                        label: 'Total value',
                        data: TotalValue,
                        borderWidth: 1
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
    }
    return (
        <div>
            <h1>Chart</h1>
            <canvas id='myChart'></canvas>
            <button onClick={render}>Render Chart</button>
        </div>
    )
}

export default Charts

