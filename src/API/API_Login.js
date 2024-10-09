import Swal from 'sweetalert2'
import { success, warning } from '../swal/Swal';


const handleLogin = async (email, password) => {
    try {
        const body = { email, password }
        const response = await fetch(
            'http://localhost:3000/users/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        )
        const result = await response.json();
        console.log(result);
        if (result.status) {
            if (result.data.role == 2) {
                success()
                // window.location.href = '/Product';
            } else {
                warning()
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export { handleLogin };