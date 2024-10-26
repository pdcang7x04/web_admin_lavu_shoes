import React, { useEffect, useState } from 'react'
import { getProductById } from '../API/API_Product'
import { getAllOrder } from '../API/API_Order'

const PurchaseOverview = () => {
    const [Purchase, setPurchase] = useState(0)
    const [Cost, setCost] = useState(0)
    const [Cancel, setCancel] = useState(0)
    const [Return, setReturn] = useState(0)

    //tính theo tổng dữ liệu không phân theo thời gian
    const purchaseOverview = async () => {
        try {
            const data = await getAllOrder();
            let purchase = 0;
            let cost = 0;
            let cancel = 0;
            let returnAmount = 0;
            data.forEach((item) => {
                item.orderDetail.forEach(async (item) => {
                    purchase += item.quantity
                })

                if (item.paymentStatus === 6) {
                    cancel++;
                    item.orderDetail.forEach(async (item) => {
                        const product = await getProductById(item.product_id)
                        item.orderDetail.forEach(async (item) => {
                            returnAmount += item.quantity * product.price
                        })
                    })
                }
            });

            setPurchase(purchase);
            setCancel(cancel)
            setReturn(returnAmount)
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        purchaseOverview()
    }, [])

    return (
        <div>
            <div>
                <h4>Số lượng mua hàng:{Purchase}</h4>
            </div>

            <div>
                <h4>Chi phí phát sinh:</h4>
            </div>

            <div>
                <h4>Số lượng hủy: {Cancel}</h4>
            </div>

            <div>
                <h4>Giá trị hàng trả lại: {Return}</h4>
            </div>

        </div>
    )
}

export default PurchaseOverview

