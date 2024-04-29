import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
import React from "react";
import { AuthorStore } from "../../../../stores/AuthorStore";
import * as XLSX from "xlsx";
interface IProps {
    datasource: AuthorStore[];
    onUpdate: (value: AuthorStore) => void;
    onDelete: (id: string) => void;
}
export const TableAuthor: React.FC<IProps> = ({ datasource, onUpdate, onDelete }) => {

    const columns: TableColumnsType<AuthorStore> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Ảnh đại diện', dataIndex: 'au_avatar', key: 'au_avatar' },
        { title: 'Mã tác giả', dataIndex: 'au_code', key: 'au_code' },
        { title: 'Tên tác giả', dataIndex: 'au_name', key: 'au_name' },
        { title: 'Ngày sinh', dataIndex: 'au_date', key: 'au_date' },
        { title: 'Địa chỉ', dataIndex: 'au_address', key: 'au_address' },
        { title: 'Email', dataIndex: 'au_email', key: 'au_email' },
        { title: 'Học hàm', dataIndex: 'academic_rank', key: 'academic_rank' },
        { title: 'Học vị', dataIndex: 'au_degree', key: 'au_degree' },
        { title: 'Bút danh', dataIndex: 'au_pen_name', key: 'au_pen_name' },
        { title: 'Thông tin thêm', dataIndex: 'au_infor', key: 'au_infor' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: AuthorStore) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => onUpdate(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => onDelete(record.au_id)} />
                </div>
            )
        }
    ];

    const exportFile = () => {
        const ws = XLSX.utils.aoa_to_sheet(datasource.map(({au_id, ...obj}) => Object.values(obj)))
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, "author.xlsx");
    }

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={datasource}
                rowKey="au_id"
                scroll={{ x: 1500 }}
            />
            <Button onClick={() => exportFile()}>Xuat</Button>
        </div>

    )
}
export default TableAuthor;