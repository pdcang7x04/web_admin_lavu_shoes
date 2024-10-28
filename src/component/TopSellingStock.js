import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../API/API_Product';

const TopSellingStock = () => {
    const [products, setProducts] = useState([]); // Change to an array
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [keywords, setKeywords] = useState('');

    const fetchProducts = async () => {
        try {
            const result = await getAllProduct();
            if (result) {
                // Sort products by quantitySold in descending order
                const sortedProducts = result.sort((a, b) => b.quantitySold - a.quantitySold);
                const topProducts = sortedProducts.slice(0, 4);
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
            <h4>Hàng Bán Chạy</h4>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Đã Bán</th>
                        <th>Số Lượng Còn Lại</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.quantitySold}</td>
                            <td>{product.currentQuantity}</td>
                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopSellingStock;