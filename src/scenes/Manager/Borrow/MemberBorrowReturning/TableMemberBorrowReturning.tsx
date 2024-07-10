import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { MemberBorrowReturningDTO } from "../../../../stores/MemberBorrowReturningStore";
import { DocumentInfoDTO } from "../../../../stores/DocumentInfoStore";
const dayjs = require('dayjs');

interface IProps {
    onUpdate?: (value: MemberBorrowReturningDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: MemberBorrowReturningDTO[]) => void;
    datasource?: MemberBorrowReturningDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<MemberBorrowReturningDTO>) => void;
}
export const TableMemberBorrowReturning: React.FC<IProps> = (props) => {
    const [multiSelectMemberBorrowReturning, setMultiSelectMemberBorrowReturning] = useState<MemberBorrowReturningDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            props.setMultiDataSelected(multiSelectMemberBorrowReturning);
        }
    }, [multiSelectMemberBorrowReturning, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<MemberBorrowReturningDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Mã phiếu mượn', dataIndex: 'br_re_code', key: 'br_re_code' },
        { title: 'Người mượn', dataIndex: 'us_id_borrow', key: 'us_id_borrow' },
        { title: 'Ngày mượn', dataIndex: 'br_re_start_at', key: 'br_re_start_at', render: (text, record) => <>{!!record.br_re_start_at && dayjs(record.br_re_start_at)?.format('DD/MM/YYYY')}</>},
        { title: 'Ngày trả', dataIndex: 'br_re_end_at', key: 'br_re_end_at',  render: (text, record) => <>{!!record.br_re_end_at && dayjs(record.br_re_end_at)?.format('DD/MM/YYYY')}</>},
        { title: 'Mô tả', dataIndex: 'br_re_desc', key: 'br_re_desc' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: MemberBorrowReturningDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.br_re_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: MemberBorrowReturningDTO[]) => {
            setMultiSelectMemberBorrowReturning(selectedRows)
        },
    };

    const columnData = columns.slice(0, 7);

    return (
        <Table
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 1000 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableMemberBorrowReturning;