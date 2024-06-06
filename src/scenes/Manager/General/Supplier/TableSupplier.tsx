import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { SupplierDTO } from "../../../../stores/SupplierStore";

interface IProps {
    onUpdate?: (value: SupplierDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: SupplierDTO[]) => void;
    datasource?: SupplierDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<SupplierDTO>) => void;
}
export const TableSupplier: React.FC<IProps> = (props) => {
    const [multiSelectSupplier, setMultiSelectSupplier] = useState<SupplierDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectSupplier.length > 0 ? multiSelectSupplier : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectSupplier, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<SupplierDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Mã số thuế', dataIndex: 'su_tax_code', key: 'su_tax_code' },
        { title: 'Tên viết tắt', dataIndex: 'su_short_name', key: 'su_short_name' },
        { title: 'Tên nhà cung cấp', dataIndex: 'su_name', key: 'su_name' },
        { title: 'Người liên hệ', dataIndex: 'su_contact_name', key: 'su_contact_name' },
        { title: 'Địa chỉ', dataIndex: 'su_contact_address', key: 'su_contact_address' },
        { title: 'Số điện thoại', dataIndex: 'su_contact_phone', key: 'su_contact_phone' },
        { title: 'Email', dataIndex: 'su_contact_email', key: 'su_contact_email' },
        { title: 'Fax', dataIndex: 'su_contact_fax', key: 'su_contact_fax' },
        { title: 'Ghi chú', dataIndex: 'su_contact_note', key: 'su_contact_note' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: SupplierDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.su_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: SupplierDTO[]) => {
            setMultiSelectSupplier(selectedRows)
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
export default TableSupplier;