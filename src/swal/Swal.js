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

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

export const deleteItem = (message) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: "Bạn có chắc không?",
            text: "Bạn sẽ không thể hoàn nguyên điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, xóa nó!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire({
                    title: "Đã xóa!",
                    text: message + " của bạn đã bị xóa.",
                    icon: "success"
                });
                resolve(true); // Xác nhận xóa
            } else {
                resolve(false); // Hủy bỏ hành động
            }
        });
    });
};