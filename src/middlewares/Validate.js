import { Alert } from "bootstrap";
import { warning } from "../swal/Swal";

const isEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validateEmail = (email) => {
    if (!email.trim()) {
        warning('Email không được để trống');
        return false;
    } else if (!isEmail(email)) {
        warning('Email không đúng định dạng');
        return false;
    }
    return true;
}

const isPassword = (password) => {
    // Định dạng mật khẩu: Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validatePassword = (password) => {
    if (!password.trim()) {
        warning('Mật khẩu không được để trống');
        return false;
    } else if (password.length < 8) {
        warning('Mật khẩu không được nhỏ hơn 8 ký tự');
        return false;
    } else if (!isPassword(password)) {
        warning('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
        return false;
    }
    return true;
}


