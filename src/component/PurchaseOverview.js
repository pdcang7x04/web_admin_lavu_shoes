import React, { useEffect, useState } from 'react';
import { getProductById } from '../API/API_Product';
import { getAllOrder } from '../API/API_Order';

const PurchaseOverview = () => {
    const [Purchase, setPurchase] = useState(0);
    const [Cost, setCost] = useState(0);
    const [Cancel, setCancel] = useState(0);
    const [Return, setReturn] = useState(0);

    // Calculate total data without time separation
    const purchaseOverview = async () => {
        try {
            const data = await getAllOrder();
            let purchase = 0;
            let cancel = 0;
            let returnAmount = 0;

            for (const item of data) {
                if (item.orderDetail && Array.isArray(item.orderDetail)) {
                    item.orderDetail.forEach((orderItem) => {
                        purchase += orderItem.quantity;
                    });
                }

                if (item.paymentStatus === 6) {
                    cancel++;
                    if (item.orderDetail && Array.isArray(item.orderDetail)) {
                        for (const orderItem of item.orderDetail) {
                            const product = await getProductById(orderItem.product_id);
                            returnAmount += orderItem.quantity * product.price;
                        }
                    }
                }
            }

            setPurchase(purchase);
            setCancel(cancel);
            setReturn(returnAmount);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        purchaseOverview();
    }, []);

    return (
        <div>
            <div>
                <h4>Số lượng mua hàng: {Purchase}</h4>
            </div>

            <div>
                <h4>Chi phí phát sinh: {Cost}</h4>
            </div>

            <div>
                <h4>Số lượng hủy: {Cancel}</h4>
            </div>

            <div>
                <h4>Giá trị hàng trả lại: {Return}</h4>
            </div>
        </div>
    );
};

export default PurchaseOverview;