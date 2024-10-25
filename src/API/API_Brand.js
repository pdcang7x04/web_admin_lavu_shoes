import Swal from 'sweetalert2'
import { deleteItem, success, warning } from '../swal/Swal';


const getBrand = async (page, limit, keywords) => {
    try {
        const response = await fetch(
            `http://localhost:3000/brands/getBrandByQuery?page=${page}&limit=${limit}&keywords=${keywords}`,
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

const getAllBrand = async () => {
    try {
        const response = await fetch(
            `http://localhost:3000/brands/getBrand`,
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

const addNewBrand = async (body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/brands/insert`,
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

const updateBrand = async (id, body) => {
    try {
        const response = await fetch(
            `http://localhost:3000/brands/update/${id}`,
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


const deleteBrand = async (id) => {
    try {
        const confirmed = await deleteItem("Thương hiệu");
        if (!confirmed) {
            return; // Nếu không xác nhận, thoát khỏi hàm
        }
        const response = await fetch(
            `http://localhost:3000/brands/deleteById/${id}`,
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



export { getBrand, getAllBrand, addNewBrand, updateBrand, deleteBrand };