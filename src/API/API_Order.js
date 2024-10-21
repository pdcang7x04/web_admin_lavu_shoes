import Swal from 'sweetalert2'
import { success, warning } from '../swal/Swal';

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const getOrder = async (page, limit, keywords) => {
    try {
        const response = await fetch(
            `http://localhost:3000/orders/getOrder?page=${page}&limit=${limit}&keywords=${keywords}`,
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

export { getOrder, formatDate };