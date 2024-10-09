import Swal from "sweetalert2";

export const warning = () => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Invalid access permission!",
        showConfirmButton: false,
        timer: 1500
    });
}
export const success = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Invalid access permission!",
        showConfirmButton: false,
        timer: 1500
    });
}