import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, message } from 'antd';

type ConfirmCallback = () => void;

const { confirm } = Modal;

export const showDeleteConfirm = (onConfirm: ConfirmCallback) => {
    confirm({
        title: 'Bạn có chắc chắn muốn xóa?',
        icon: <ExclamationCircleFilled />,
        content: 'Điều này không thể phục hồi',
        onOk() {
            onConfirm();
        },
        onCancel() {
            message.info("Đã hủy thao tác!");
        },
    });
};