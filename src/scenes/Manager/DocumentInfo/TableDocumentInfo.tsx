import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { DocumentInfoDTO } from "../../../stores/DocumentInfoStore";
interface IProps {
    onUpdate?: (value: DocumentInfoDTO) => void;
    onDelete?: (data: DocumentInfoDTO[]) => void;
    setMultiDataSelected?: (data: DocumentInfoDTO[]) => void;
    datasource?: DocumentInfoDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<DocumentInfoDTO>) => void;
}
export const TableDocumentInfo: React.FC<IProps> = (props) => {
    const [multiSelectDocumentInfo, setMultiSelectDocumentInfo] = useState<DocumentInfoDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectDocumentInfo.length > 0 ? multiSelectDocumentInfo : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectDocumentInfo, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<DocumentInfoDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Số ĐKCB', dataIndex: 'do_in_dkcb', key: 'do_in_dkcb' },
        { title: 'Tên tài liệu', dataIndex: 'do_in_title', key: 'do_in_title' },
        { title: 'Trạng thái', dataIndex: 'do_in_status', key: 'do_in_status' },
        { title: 'Ghi chú', dataIndex: 'do_in_note', key: 'do_in_note' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: DocumentInfoDTO) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!([record])} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DocumentInfoDTO[]) => {
            setMultiSelectDocumentInfo(selectedRows)
        },
    };

    const columnData = columns.slice(0, 11);

    return (
        <Table
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 700 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableDocumentInfo;