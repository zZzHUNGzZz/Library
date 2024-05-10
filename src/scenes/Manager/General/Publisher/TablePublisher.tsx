import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { PublisherDTO } from "../../../../stores/PublisherStore";
interface IProps {
    onUpdate?: (value: PublisherDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: PublisherDTO[]) => void;
    datasource?: PublisherDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<PublisherDTO>) => void;
}
export const TablePublisher: React.FC<IProps> = (props) => {
    const [multiSelectPublisher, setMultiSelectPublisher] = useState<PublisherDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectPublisher.length > 0 ? multiSelectPublisher : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectPublisher, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<PublisherDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Tên nhà xuất bản', dataIndex: 'pu_name', key: 'pu_name' },
        { title: 'Tên viết tắt', dataIndex: 'pu_short_name', key: 'pu_short_name' },
        { title: 'Địa chỉ ', dataIndex: 'pu_address', key: 'pu_address' },
        { title: 'Số điện thoại', dataIndex: 'pu_phone', key: 'pu_phone' },
        { title: 'Email', dataIndex: 'pu_email', key: 'pu_email' },
        { title: 'Website', dataIndex: 'pu_website', key: 'pu_website' },
        { title: 'Thông tin thêm', dataIndex: 'pu_infor', key: 'pu_infor' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: PublisherDTO) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.pu_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: PublisherDTO[]) => {
            setMultiSelectPublisher(selectedRows);
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
export default TablePublisher;