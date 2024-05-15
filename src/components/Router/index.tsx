import { PieChartOutlined, UserOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const publicRouter: MenuItem[] = [
    getItem('Trang chủ', '/dashbroad', <PieChartOutlined />),
    getItem('Quản lý sách báo tài liệu', '/1', <UserOutlined />, [
        getItem('Tài liệu', '/document'),
        getItem('Thông tin tài liệu', '/document-info'),
    ]),
    getItem('Quản lý mượn trả', '/2', <UserOutlined />, [
        // getItem('Độc giả mượn', '/member-borrow-returning'),
        getItem('Quản lý mượn trả', '/member-borrow-returning'),
    ]),
    getItem('Quản lý độc giả', '/3', <UserOutlined />, [
        getItem('Độc giả', '/member'),
        getItem('Thẻ độc giả', '/member-card'),
        // getItem('Lịch sử độc giả', '/member-history'),
    ]),
    getItem('Báo cáo thống kê', '/4', <UserOutlined />, [
        getItem('Báo cáo tài liệu', '/document-statistic'),
        getItem('Báo cáo độc giả', '/member-statistic'),
        // getItem('Báo cáo mượn trả', '/borrow-return-statistic'),
    ]),
    getItem('Quản lý chung', '/5', <UserOutlined />, [
        getItem('Tác giả', '/author'),
        getItem('Danh mục', '/category'),
        getItem('Nhà cung cấp', '/supplier'),
        getItem('Nhà xuất bản', '/publisher'),
        getItem('Ngôn ngữ', '/language'),
        // getItem('Phạt', '/punish'),
    ]),
];

export default publicRouter;