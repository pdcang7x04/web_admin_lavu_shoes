import Swal from 'sweetalert2'
import { deleteItem, success, warning } from '../swal/Swal';


const getCategory = async () => {
    try {
        const response = await fetch(
            `http://localhost:3000/categories/getAllCategory`,
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

const getCategoryByQuery = async (page, limit, keywords) => {
    try {
        const response = await fetch(
            `http://localhost:3000/categories/getCategory?page=${page}&limit=${limit}&keywords=${keywords}`,
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


const addNewCategory = async (body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/categories/insert`,
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

const updateCategory = async (id, body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/categories/update/${id}`,
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


const deleteCategory = async (id) => {
    try {
        const confirmed = await deleteItem("Danh mục");
        if (!confirmed) {
            return; // Nếu không xác nhận, thoát khỏi hàm
        }
        const response = await fetch(
            `http://localhost:3000/categories/deleteById/${id}`,
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


export { getCategory, getCategoryByQuery, addNewCategory, updateCategory,deleteCategory };