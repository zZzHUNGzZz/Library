import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, Trang bạn truy cập không tồn tại"
            extra={<Button type="primary" onClick={() => navigate("/dashbroad")}>Trở về trang chủ</Button>}
        />
    );
}

export default PageNotFound;