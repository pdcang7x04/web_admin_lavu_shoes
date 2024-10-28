import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../API/API_Product';

const LowQuantityStock = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [keywords, setKeywords] = useState('');

    const fetchProducts = async () => {
        try {
            const result = await getAllProduct();
            if (result) {
                // Sort products by quantitySold in descending order
                const sortedProducts = result.sort((a, b) => a.currentQuantity - b.currentQuantity);
                const topProducts = sortedProducts.slice(0, 3);
                setProducts(topProducts);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h4>Sắp hết hàng</h4>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Đã bán</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.currentQuantity}</td>
                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LowQuantityStock;