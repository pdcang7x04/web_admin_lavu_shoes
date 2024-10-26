import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../API/API_Product';
import { getAllOrder } from '../API/API_Order';

const InventorySummary = () => {
    const [QuantityInHand, setQuantityInHand] = useState(0)
    const [ToBeReceived, setToBeReceived] = useState(0)

    const quantityInHand = async () => {
        try {
            const data = await getAllProduct();
            let sum = 0;
            data.forEach((item) => {
                sum += item.currentQuantity;
            });
            setQuantityInHand(sum)
        } catch (error) {
            console.error(error);
        }
    };

    //tổng đơn hàng hiện có không phân theo thời gian
    const toBeReceived = async () => {
        try {
            const data = await getAllOrder();
            let sum = 0;
    
            data.forEach((item) => {
                if (item.paymentStatus >= 3 && item.paymentStatus <= 4) {
                    item.orderDetail.forEach((item) => {
                        sum += item.quantity
                    })
                }
            });
    
            setToBeReceived(sum);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        quantityInHand()
        toBeReceived()
    }, [])
    return (
        <div>
            <div>
                <h4>Số lượng hàng hiện có: {QuantityInHand}</h4>
            </div>

            <div>
                <h4>Số lượng sản phẩm sắp được giao: {ToBeReceived}</h4>
            </div>
        </div>
    )
}

export default InventorySummary

