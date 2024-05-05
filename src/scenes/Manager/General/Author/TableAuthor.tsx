import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { AuthorStore } from "../../../../stores/AuthorStore";
interface IProps {
    onUpdate?: (value: AuthorStore) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: AuthorStore[]) => void;
    datasource?: AuthorStore[];
    isExportTable?: boolean;
}
export const TableAuthor: React.FC<IProps> = ({ onUpdate, onDelete, setMultiDataSelected, datasource, isExportTable }) => {
    const [multiSelectAuthor, setMultiSelectAuthor] = useState<AuthorStore[]>([]);

    useEffect(() => {
        if (setMultiDataSelected) {        
            const multiDataSelected = multiSelectAuthor.length > 0 ? multiSelectAuthor : datasource!;
            setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectAuthor, datasource, setMultiDataSelected]);

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
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => onDelete!(record.au_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: AuthorStore[]) => {
            setMultiSelectAuthor(selectedRows)         
        },
    };

    const columnToExport = columns.slice(0, 11);

    return (
        <Table
            bordered
            columns={isExportTable ? columnToExport : columns}
            dataSource={datasource}
            rowKey="au_id"
            scroll={{ x: 1551 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => onUpdate!(record)
                };
            }}
            rowSelection={isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableAuthor;