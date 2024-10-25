import Swal from 'sweetalert2'
import { success, warning } from '../swal/Swal';


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


export { getCategory };