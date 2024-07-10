import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { DocumentInfoDTO } from "../../../stores/DocumentInfoStore";
interface IProps {
    onUpdate?: (value: DocumentInfoDTO) => void;
    onDelete?: (data: DocumentInfoDTO[]) => void;
    setMultiDataSelected?: (data: DocumentInfoDTO[]) => void;
    datasource?: DocumentInfoDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<DocumentInfoDTO>) => void;
    isBorrowReturning?: boolean;
}
export const TableDocumentInfo: React.FC<IProps> = (props) => {
    const [multiSelectDocumentInfo, setMultiSelectDocumentInfo] = useState<DocumentInfoDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            props.setMultiDataSelected(multiSelectDocumentInfo);
        }
    }, [multiSelectDocumentInfo, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const displayStatus = (value: DocumentInfoDTO) => {
        if (value.do_in_status == 1) {
            return (
                <Tag color="success">Sẵn sàng</Tag>
            )
        }
        else if (value.do_in_status == 2) {
            return (
                <Tag color="processing">Đang cho mượn</Tag>
            )
        }
        else {
            return (
                <Tag color="error">Bị hỏng, mất,...</Tag>
            )
        }
    }

    const columns: TableColumnsType<DocumentInfoDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', align: 'center', width: 60, render: (index: number) => index + 1 },
        { title: 'Số ĐKCB', dataIndex: 'do_in_dkcb', key: 'do_in_dkcb', align: 'center' },
        { title: 'Tên tài liệu', dataIndex: 'do_in_title', key: 'do_in_title', align: 'center' },
        {
            title: 'Trạng thái', dataIndex: 'do_in_status', key: 'do_in_status', align: 'center',
            render: (text: any, record: DocumentInfoDTO) => (displayStatus(record))
        },
        { title: 'Ghi chú', dataIndex: 'do_in_note', key: 'do_in_note', align: 'center' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: DocumentInfoDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!([record])} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DocumentInfoDTO[]) => {
            setMultiSelectDocumentInfo(selectedRows);
            return;
        },
    };

    const columnData = props.isBorrowReturning ? columns.slice(0, 3) : (props.isExportTable ? columns.slice(0, 5) : columns)
    return (
        <Table
            bordered
            columns={columnData}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 700 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => (props.isExportTable || props.isBorrowReturning ) ? undefined : props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableDocumentInfo;