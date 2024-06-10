import {message } from "antd";

export const validateImageSize  = (file: any) => {
    const isLt2M = (!!file.size ? file.size : 0) / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isLt2M;
};