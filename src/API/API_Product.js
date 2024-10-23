const getProductById = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/products/getProduct/${id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        const result = await response.json();
        console.log(result);
        if (result.status) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export { getProductById };