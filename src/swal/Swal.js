import Swal from "sweetalert2";

export const warning = (message) => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}
export const success = (message) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}