import Swal from 'sweetalert2'
import { success, warning } from '../swal/Swal';


const getUser = async (page, limit, keywords) => {
    try {
        const response = await fetch(
            `http://localhost:3000/users/getUser?page=${page}&limit=${limit}&keywords=${keywords}`,
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

const getUserById = async (_id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/users/getUserByID/${_id}`,
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

export { getUser, getUserById };