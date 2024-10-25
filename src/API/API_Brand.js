import Swal from 'sweetalert2'
import { success, warning } from '../swal/Swal';


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


export { getBrand, getAllBrand };