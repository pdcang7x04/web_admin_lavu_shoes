import { deleteItem } from "../swal/Swal";

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

const addNewProduct = async (body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/products/insert`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
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

const updateProduct = async (id, body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/products/update/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
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


const deleteProduct = async (id) => {
    try {
        const confirmed = await deleteItem("Sản phẩm");
        if (!confirmed) {
            return; // Nếu không xác nhận, thoát khỏi hàm
        }
        const response = await fetch(
            `http://localhost:3000/products/deleteById/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        const result = await response.json();
        console.log(result);
        if (result.status) {
            window.location.reload();
            return result.data

        }

    } catch (error) {
        console.log(error);
    }
}

export { getProductById, addNewProduct, deleteProduct, updateProduct };