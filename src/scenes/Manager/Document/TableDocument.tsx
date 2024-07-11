import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { DocumentDTO } from "../../../stores/DocumentStore";
import moment from "moment";
interface IProps {
    onUpdate?: (value: DocumentDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: DocumentDTO[]) => void;
    datasource?: DocumentDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<DocumentDTO>) => void;
}

const dayjs = require('dayjs');

export const TableDocument: React.FC<IProps> = (props) => {
    const [multiSelectDocument, setMultiSelectDocument] = useState<DocumentDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectDocument.length > 0 ? multiSelectDocument : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectDocument, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<DocumentDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Tên tài liệu', dataIndex: 'do_title', key: 'do_title' },
        { title: 'Tác giả', dataIndex: 'do_author', key: 'do_author' },
        { title: 'Số lượng', dataIndex: 'do_total_book', key: 'do_total_book' },
        { title: 'Ngày khai thác', dataIndex: 'do_date_available', key: 'do_date_available', render: (text, record) => <>{!!record.do_date_available && dayjs(record.do_date_available)?.format('DD/MM/YYYY')}</>, },
        { title: 'Ngày xuất bản', dataIndex: 'do_date_publish', key: 'do_date_publish', render: (text, record) => <>{!!record.do_date_publish && dayjs(record.do_date_publish)?.format('DD/MM/YYYY')}</>, },
        { title: 'Mã đầu sách', dataIndex: 'do_identifier', key: 'do_identifier' },
        { title: 'Dịch giả', dataIndex: 'do_translator', key: 'do_translator' },
        { title: 'Nhà xuất bản', dataIndex: 'do_publisher', key: 'do_publisher' },
        { title: 'Ngôn ngữ', dataIndex: 'do_language', key: 'do_language' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: DocumentDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.do_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DocumentDTO[]) => {
            setMultiSelectDocument(selectedRows)
        },
    };

    const columnData = columns.slice(0, 10);

    return (
        <Table
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 1551 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableDocument;