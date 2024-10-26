import React, { useEffect, useState } from 'react';

const TopSellingStock = () => {
    const [products, setProducts] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [keywords, setKeywords] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/products/getProduct?page=${page}&limit=${limit}&keywords=${keywords}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const result = await response.json();
            if (result.status) {
                // Sort products by quantitySold in descending order
                const sortedProducts = result.data.data.sort((a, b) => b.quantitySold - a.quantitySold);
                setProducts({ ...result, data: { ...result.data, data: sortedProducts } });
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, limit, keywords]);

    return (
        <div>
            <h4>hàng bán chạy</h4>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Đã bán</th>
                        <th>Số lượng còn lại</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.data?.map((product) => (
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