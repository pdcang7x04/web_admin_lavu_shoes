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

const isPositiveNumber = (value) => {
    return !isNaN(value) && Number(value) > 0;
};

const isNonEmptyString = (value) => {
    return value.trim().length > 0;
};

export const validateName = (name) => {
    if (!isNonEmptyString(name)) {
        warning('Tên sản phẩm không được để trống');
        return false;
    }
    return true;
};

export const validatePrice = (price) => {
    if (!isPositiveNumber(price)) {
        warning('Giá sản phẩm phải là số dương');
        return false;
    }
    return true;
};

export const validateCurrentQuantity = (quantity) => {
    if (!isPositiveNumber(quantity)) {
        warning('Số lượng hiện tại phải là số dương');
        return false;
    }
    return true;
};

export const validateDescription = (description) => {
    if (!isNonEmptyString(description)) {
        warning('Mô tả không được để trống');
        return false;
    }
    return true;
};

export const validateImage = (image) => {
    if (image.length === 0) {
        warning('Vui lòng chọn ít nhất một hình ảnh');
        return false;
    }
    return true;
};

export const validateColor = (colors) => {
    if (colors.length === 0) {
        warning('Vui lòng chọn ít nhất một màu');
        return false;
    }
    return true;
};

export const validateSize = (sizes) => {
    if (sizes.length === 0) {
        warning('Vui lòng chọn ít nhất một kích thước');
        return false;
    }
    return true;
};

export const validateStatus = (status) => {
    if (![1,2,3,4].includes(status)) {
        warning('Trạng thái không hợp lệ');
        return false;
    }
    return true;
};

export const validateBrand = (brand) => {
    if (!isNonEmptyString(brand)) {
        warning('Vui lòng chọn một thương hiệu');
        return false;
    }
    return true;
};

export const validateCategory = (category) => {
    if (!isNonEmptyString(category)) {
        warning('Vui lòng chọn một danh mục');
        return false;
    }
    return true;
};


