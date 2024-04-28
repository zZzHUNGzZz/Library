import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { DocumentStore } from "../../../../stores/DocumentStore";


interface IProps {
    datasource: DocumentStore[];
    onUpdate: (value: DocumentStore) => void;
    onDelete: (id: string) => void;
}
export const TableDocument: React.FC<IProps> = ({ datasource, onUpdate, onDelete }) => {
    const columns : TableColumnsType<DocumentStore> = [
        { title: 'STT', dataIndex: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Tên tài liệu', dataIndex: 'do_title', },
        { title: 'Tác giả', dataIndex: 'author', },
        { title: 'Số lượng', dataIndex: 'do_total', },
        { title: 'Năm xuất bản', dataIndex: 'do_date_publish', },
        { title: 'Mã đầu sách', dataIndex: 'do_identifier', },
        { title: 'Dịch giả', dataIndex: 'do_translator', },
        { title: 'Nhà xuất bản', dataIndex: 'do_publisher', },
        { title: 'Ngôn ngữ', dataIndex: 'do_language', },
        { title: 'Chủ đề', dataIndex: 'do_topic', },
        { title: 'Danh mục', dataIndex: 'do_category', },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: ( text: any, record: DocumentStore) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => onUpdate(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => onDelete(record.do_id)} />
                </div>
            )
        }
    ];
    return (
        <Table
            bordered
            columns={columns}
            dataSource={datasource}
            rowKey="do_id"
            scroll={{ x: 1500 }}
        />
    )
}
export default TableDocument;