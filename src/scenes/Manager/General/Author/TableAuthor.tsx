import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { AuthorStore } from "../../../../stores/AuthorStore";


interface IProps {
    datasource: AuthorStore[];
    onUpdate: (value: AuthorStore) => void;
    onDelete: (id: string) => void;
}
export const TableAuthor: React.FC<IProps> = ({ datasource, onUpdate, onDelete }) => {
    const columns : TableColumnsType<AuthorStore> = [
        { title: 'STT', dataIndex: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Mã tác giả', dataIndex: 'au_code', },
        { title: 'Tên tác giả', dataIndex: 'au_name', },
        { title: 'Ngày sinh', dataIndex: 'au_date', },
        { title: 'Địa chỉ', dataIndex: 'au_address', },
        { title: 'Email', dataIndex: 'au_email', },
        { title: 'Học hàm', dataIndex: 'academic_rank', },
        { title: 'Học vị', dataIndex: 'au_degree', },
        { title: 'Bút danh', dataIndex: 'au_pen_name', },
        { title: 'Thông tin thêm', dataIndex: 'au_infor', },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: ( text: any, record: AuthorStore) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => onUpdate(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => onDelete(record.au_id)} />
                </div>
            )
        }
    ];
    return (
        <Table
            bordered
            columns={columns}
            dataSource={datasource}
            rowKey="au_id"
            scroll={{ x: 1500 }}
        />
    )
}
export default TableAuthor;